import React from 'react';
import firebase from '../firebase.js';
import {Link} from 'react-router-dom';
import './Register.css';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email:'',
      password:'',
      error:null
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    const {email, username, password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
      const user = firebase.auth().currentUser;
      user.updateProfile({displayName: username}).then(() => {
        this.props.history.push('/');
      })
      .catch(error=> {
        this.setState({error});
      });
    })
    .catch(error => {
      this.setState({error});
    })
  }

  render(){
    const {email, username, password, error} = this.state
    return(
      <div className="auth-container">
        <h1>Register</h1>
        <div className="container">
          <div className="row justify-content-center">
            {error && <p className="error-message">{error.message}</p>}
            <form className="col-6" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input tyle="text" name="username" id="username" value={username} onChange={this.handleChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Choose a password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                  >
                </input>
              </div>
              <button className="submit">Get started</button>
              <p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
            </form>
          </div>
        </div>  
      </div>
    );
  }
}
export default Register;