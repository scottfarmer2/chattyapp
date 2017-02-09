import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentUser: {},
            messages: []
        }
    }


    componentDidMount() {
        this.socket = new WebSocket("ws://localhost:3001");
        this.socket.onopen = (event) => {
            console.log('Connect to server');
        };
         this.socket.onmessage = (event) => {
            console.log("incoming messages", JSON.parse(event.data));
            let newData = JSON.parse(event.data);
            let newChat = this.state.messages.concat(newData);
            this.setState({messages: newChat});
            console.log(this.state);
            // this.state.data.messages
        }
    }

    updateUsername (e) {
        if (e.keyCode === 13) {
            const user = {
                username: e.target.value
            }
            console.log(user);

        this.setState({currentUser: user})
        }
    }

    newMessage(e) {
        if (e.keyCode === 13) {
            // console.log(this.state.messages);
           // this.state.currentid.id += 1;
            const newMessage = {

                // id: this.state.currentid.id,
                username: this.state.currentUser.username,
                content: e.target.value
            }

            console.log(newMessage)
            // const message = this.state.messages.concat(newMessage);
            // this.setState({messages: message});
            this.socket.send(JSON.stringify(newMessage));
        }

    }



      render() {
        return (
            <div className="wrapper">
                <nav>
                    <h1>Chatty</h1>
                </nav>
                <MessageList messages={this.state.messages} />
                <ChatBar updateUsername={this.updateUsername.bind(this)} newMessage={this.newMessage.bind(this)}  />
            </div>
        );
      }
}
export default App;
