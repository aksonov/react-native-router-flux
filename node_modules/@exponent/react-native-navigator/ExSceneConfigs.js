'use strict';

import React, {
  Dimensions,
  Navigator,
  PixelRatio,
} from 'react-native';

import buildStyleInterpolator from './vendor/buildStyleInterpolator';

let ToTheLeft = {
  // Rotate *requires* you to break out each individual component of
  // rotation (x, y, z, w)
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  opacity: {
    from: 1,
    to: 0.97,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 1000,
  },
  translateX: {
    from: 0,
    to: -Math.round(Dimensions.get('window').width * 0.3),
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  scaleX: {
    value: 1,
    type: 'constant',
  },
  scaleY: {
    value: 1,
    type: 'constant',
  },
};

let FromTheRight = {
  transformTranslate: {
    from: {x: Dimensions.get('window').width, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  opacity: {
    value: 1.0,
    type: 'constant',
  },
  shadowOpacity: {
    from: 0.1,
    to: 0.5,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },
  shadowRadius: {
    from: 2,
    to: 6,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },
  translateX: {
    from: Dimensions.get('window').width,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  scaleX: {
    value: 1,
    type: 'constant',
  },
  scaleY: {
    value: 1,
    type: 'constant',
  },
};

let Still = {
  opacity: {
    value: 1,
    type: 'constant',
  },
};

let FromTheBottom = {
  opacity: {
    value: 1.0,
    type: 'constant',
  },
  transformTranslate: {
    from: {x: 0, y: Dimensions.get('window').height, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  translateY: {
    from: Dimensions.get('window').height,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  scaleX: {
    value: 1,
    type: 'constant',
  },
  scaleY: {
    value: 1,
    type: 'constant',
  },
};

let ToTheBack = {
  opacity: {
    value: 1,
    type: 'constant',
  },
  transformScale: {
    from: {x: 1, y: 1, z: 1},
    to: {x: 0.95, y: 0.95, z: 1},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },
  scaleX: {
    from: 1,
    to: 0.95,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },
  scaleY: {
    from: 1,
    to: 0.95,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },
};

let FromTheFront = {
  opacity: {
    from: 0,
    to: 1,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },
  transformScale: {
    from: {x: 1.05, y: 1.05, z: 1},
    to: {x: 1, y: 1, z: 1},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },
};

let ExSceneConfigs = {
  Fade: Navigator.SceneConfigs.FadeAndroid,
  FloatFromRight: {
    ...Navigator.SceneConfigs.FloatFromRight,
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheRight),
      out: buildStyleInterpolator(ToTheLeft),
    },
  },
  FloatFromBottom: {
    ...Navigator.SceneConfigs.FloatFromBottom,
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheBottom),
      out: buildStyleInterpolator(Still),
    },
  },
  PushFromRight: {
    ...Navigator.SceneConfigs.PushFromRight,
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheRight),
      out: buildStyleInterpolator(ToTheLeft),
    },
  },
  ZoomFromFront: {
    ...Navigator.SceneConfigs.FloatFromBottomAndroid,
    gestures: null,
    springFriction: 22,
    defaultTransitionVelocity: 3,
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheFront),
      out: buildStyleInterpolator(ToTheBack),
    },
  },
};

export default ExSceneConfigs;
