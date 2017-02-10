import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: {color: "black"},
            userCount: 0,
            currentUser: {username: "Anonymous"},
            messages: []
        }
    }


    componentDidMount() {
        this.socket = new WebSocket("ws://localhost:3001");
        this.socket.onopen = (event) => {
            console.log('Connect to server');

        };
         this.socket.onmessage = (event) => {
            let newData = JSON.parse(event.data);
            console.log(newData);
            if (newData.type === "connectedUsers") {
                console.log(newData.userCount)
                this.setState({userCount: newData.userCount});
            } else if (newData.type === "incomingColor") {
                this.setState({color: {color: newData.color}})
                console.log("this state", this.state);
            } else if (newData.type === "incomingMessage") {

            let newChat = this.state.messages.concat(newData);
            this.setState({messages: newChat, color: newData.color});
            } else if (newData.type === "incomingNotification") {
             let newChat = this.state.messages.concat(newData);
            this.setState({messages: newChat});
            }
            }
            console.log("regjeafbjhbsdjvfkhwvchwv", this.state);
            // this.state.data.messages
        }


    updateUsername (e) {
        if (e.keyCode === 13) {
            const user = {
                type: "postNotification",
                username: e.target.value,
                oldUserName: this.state.currentUser["username"]
            }
            console.log(user);

        this.setState({currentUser: user})
        this.socket.send(JSON.stringify(user));
        }
    }

    newMessage(e) {
        if (e.keyCode === 13) {
            // console.log(this.state.messages);
           // this.state.currentid.id += 1;
            const newMessage = {

                color: this.state.color,
                type : "postMessage",
                username: this.state.currentUser.username,
                content: e.target.value
            }

            console.log("hhhhhhhhhhhhhhhhhh", this.state);
            // const message = this.state.messages.concat(newMessage);
            // this.setState({messages: message});
            this.socket.send(JSON.stringify(newMessage));
        }

    }



      render() {
        return (
            <div className="wrapper">
                <nav>
                    <h1>Chatty</h1><span>{this.state.userCount} users online</span>
                </nav>
                <MessageList messages={this.state.messages} />
                <ChatBar updateUsername={this.updateUsername.bind(this)} newMessage={this.newMessage.bind(this)}  />
            </div>
        );
      }
    componentDidUpdate() {
        var objDiv = document.getElementById("message-list");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}
export default App;
