import React from 'react';
import { withRouter } from 'react-router-dom'
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      password: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  submitLogin(e) {
    e.preventDefault();
    console.log(this.state);

    fetch("/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => {

      if (res.status === 200) {
        this.props.history.push('/profile');
      }

			return res.json();
		}, err => {
			console.log(err);
		})
    .then(data => {
      console.log(data);
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
  }

  render() {
    return (
      <form onSubmit={this.submitLogin}>
        <div>
          <h1>Login</h1>

          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} required />

          <br/>

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePasswordChange} required />

          <br/>

          <button type="submit">Login</button>
        </div>

        <div>
          <p>Don't have an account? <a href="/register">Register</a>.</p>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
