import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  onChange = (event) =>{
    this.setState({[event.target.name]:event.target.value });
  }
  
  onSubmit = (event) => {
    event.preventDefault()

    if(this.state.message !== ''){
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user:this.props.user.displayName,
        timestamp: new Date().getTime()
      }
      console.log(chat);
      chatRef.push(chat);
      this.setState({message:''});
    }
  
  }

  render(){
    return (
      <div className="App">
        <h1>NaKNaK</h1>
        <div className="container">
          {this.props.user &&
            <div className="allow-chat">
              <div className="row justify-content-center">
                <Chatbox />
              </div>
              <div className="row justify-content-center">
                <form className="nessage-form col-6" onSubmit={this.onSubmit}>
                  <div className="input-group">
                    <input 
                    className="form-control"
                    type="text"
                    name="message"
                    id="message"
                    value={this.state.message}
                    placeholder="Enter a message..."
                    onChange={this.onChange} />
                    <button className="btn btn-outline-secondary" type="submit">Send</button>
                  </div>
                </form>
              </div>
            </div>
          }
        </div> 
        {!this.props.user &&
          <div className="disallow-chat">
            <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
          </div>
        }
      </div>
    );
  }
}


export default App;
