import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {name: "Bob"},
            currentid: {id: 2},
            messages: [
                {
                  id: 1,
                  username: "Bob",
                  content: "Has anyone seen my marbles?",
                },
                {
                  id: 2,
                  username: "Anonymous",
                  content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                }
            ]
        }
    }

    // componentDidMount() {
    //     console.log("componentDidMount <App />");
    //     setTimeout(() => {
    //         console.log("Simulating incoming message");
    //         // Add a new message to the list of messages in the data store
    //         const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //         const messages = this.state.messages.concat(newMessage)
    //         // Update the state of the app component.
    //         // Calling setState will trigger a call to render() in App and all child components.
    //         this.setState({messages: messages})
    //     }, 3000);
    // }

    newMessage(e) {
        if (e.keyCode === 13) {
            console.log(this.state.messages);
           this.state.currentid.id += 1;
            const newMessage = {

                id: this.state.currentid.id,
                username: this.state.currentUser.name,
                content: e.target.value
            }
            const message = this.state.messages.concat(newMessage);
            this.setState({messages: message});
        }

    }


      render() {
        return (
            <div className="wrapper">
                <nav>
                    <h1>Chatty</h1>
                </nav>
                <MessageList messages={this.state.messages}/>
                <ChatBar newMessage={this.newMessage.bind(this)} name={this.state.currentUser["name"]} />
            </div>
        );
      }
}
export default App;
