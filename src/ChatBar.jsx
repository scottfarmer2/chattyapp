import React, {Component} from 'react';


class ChatBar extends Component {


  render() {
    return (
        <footer>
            <input id="username" type="text" onKeyUp={this.props.updateUsername} placeholder="Your Name (Optional)" />
            <input id="new-message" type="text" onKeyUp={this.props.newMessage} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}
export default ChatBar;
