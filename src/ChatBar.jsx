import React, {Component} from 'react';


class ChatBar extends Component {


  render() {
    return (
        <footer>
            <input id="username" type="text" defaultValue={this.props.name} placeholder="Your Name (Optional)" />
            <input id="new-message" type="text" onKeyUp={this.props.newMessage} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}
export default ChatBar;
