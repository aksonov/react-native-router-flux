import React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

export default class extends React.Component {
  componentDidMount() {
    // Register the alert located on this master page
    // This MessageBar will be accessible from the current (same) component, and from its child component
    // The MessageBar is then declared only once, in your main component.
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return <MessageBar ref="alert" />;
  }
}
