import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("color", this.props.color)
    return (
        <div>
            <div className="message">
                <span style={this.props.color} className="username">{this.props.username}   </span>
                <span className="content">{this.props.content} </span>
            </div>

        </div>
    );
  }
}
export default Message;