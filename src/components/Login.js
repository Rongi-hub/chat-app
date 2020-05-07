import React from 'react';
import './Login.css';
import firebase from '../firebase.js';
import {Link} from 'react-router-dom';
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      error: null
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this.props.history.push('/');
      })
      .catch(error=> {
        this.setState({error});
      });
  }

  render(){
    const {email, password, error} = this.state;
    return(
      <div className="auth-container">
        <h1>Login</h1>
        <p>Login to access your account</p>
        {error && <p className="error-message">{error.message}</p>}
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-6" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input className="form-control" type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                  >
                  </input>
              </div>
              <button type="submit" className="submit btn btn-outline-primary">Login</button>
              <p>Don't have an account?<br></br><Link className="login-btn" to="/register">Register here!</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;