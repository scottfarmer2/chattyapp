import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
        <div>
            <div className="message">
                <span className="username">{this.props.username}   </span>
                <span className="content">{this.props.content}</span>
            </div>

        </div>
    );
  }
}
export default Message;