import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
  render() {

    let messageComponents = this.props.messages.map((item) => {
        switch(item.type) {
            case "incomingMessage":
            return <Message key={item.id} username={item.username} content={item.content} color={item.color} />;
                break;
            case "incomingNotification":
            return <Notification key={item.id} content={item.content} />;
                break;
        }

    })

    return (
    <div id="message-list" >
        {messageComponents}
    </div>
    );
  }
}
export default MessageList;