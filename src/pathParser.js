import pathToRegexp from 'path-to-regexp';

/**
 *
 * This set of functions are used to match a url with a uri path.
 * This functionality is based on the internals of React-Router's matchPath.
 * - https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/matchPath.md
 *
 */

/**
 * This function accepts a uri path and returns a regex to match that path
 * against a url and an array of the keys extracted from that uri path
 *
 * @param {String} path - a uri path in standard template (https://tools.ietf.org/html/rfc6570)
 *
 * Sample Input: "/user/:id/"
 *
 * Sample Output:
 * {
 *     re: /^\/user\/([^\/]+?)\/(?:\/(?=$))?/i,
 *     keys: [
 *         name: "id"
 *         delimiter: "/"
 *         optional: false
 *         partial: false
 *         path: "[^\/]+?"
 *         prefix: "/"
 *         repeat: false,
 *     ]
 * }
 */
const compilePathToRegex = (path) => {
  const keys = [];
  const re = pathToRegexp(path, keys);
  // Returns the regex path to match a uri path to an actual url
  // and the keys that can be used to pull values from the url.
  return { re, keys };
};

/**
 * This function accepts a uri path and an actual url. It determines whether
 * or not they match one another. If they do not match, the funtion returns null.
 * If they do match, then the function returns the path and the params parsed
 * from the url.
 *
 * @param {String} path - a uri path in standard template (https://tools.ietf.org/html/rfc6570)
 * @param {String} url - a url that may or may not match the given path
 *
 * Case 1 - path Does Not Match Url:
 *   Sample Input: (path: "/edit/organization/(:id)", url: "/user/300002/")
 *
 *   Sample Output: null
 *
 * Case 2 - path Does Match Url:
 *   Sample Input: (path: "/user/:id/", url: "/user/300002/")
 *
 *   Sample Output:
 *   {
 *       path: "/user/:id/",
 *       params: {
 *           id: "300002",
 *       }
 *   }
 *
 */
export const matchPath = (path, url) => {
  // Remove possible query fragments, which are not supported by iOS and some
  // versions of Anroid.
  const [urlCleaned] = url.split('?');

  // Append trailing slash for compatibility with pathToRegexp
  const urlToMatch = !urlCleaned.endsWith('/') ? `${urlCleaned}/` : urlCleaned;

  // Return the regex and the keys that can be parsed from a uri path.
  const { re, keys } = compilePathToRegex(path);

  // Check if the given url matches the uri path.
  const match = re.exec(urlToMatch);

  // If there is no match, then return null.
  if (!match) {
    return null;
  }

  // Destructure to return the compiled url (aka the reconstructed url based
  // on the regex and the url parameters.
  const [compiledUrl, ...values] = match;

  // If there is an inexact match (aka the compiled path does not match the
  // given url, then return null)
  if (urlToMatch !== compiledUrl) {
    return null;
  }

  const params = keys.reduce((acc, key, index) => Object.assign({}, acc, { [key.name]: values[index] }), {});

  return { path, params };
};

/**
 * This function accepts an array of uri paths and a url. If there are no paths
 * in the array that match the given url, then the function will return null.
 * If there is at least one matching uri path, it will return the first
 * matching path and the parsed url parameters (the output from matchPath()).
 *
 * @param {Array} possibleMatchingpaths - an array of uri paths in standard template (https://tools.ietf.org/html/rfc6570)
 * @param {String} url - a url that may or may not match a given path
 *
 */
const pathParser = (url, possibleMatchingpaths = []) => possibleMatchingpaths.map(path => matchPath(path, url)).find(obj => obj);

export default pathParser;
