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

    fetch("/api/login", {
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
    	<form className="sign-in-htm" onSubmit={this.submitLogin}>
    		<div className="group">
    			<label htmlFor="user" className="label">Email</label>
    			<input type="email" className="input" value={this.state.email} onChange={this.handleEmailChange} required/>
    		</div>
    		<div className="group">
    			<label htmlFor="pass" className="label">Password</label>
    			<input type="password" className="input" data-type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
    		</div>
            <div className="login-button">
                <button type="submit" className="login">Login</button>
            </div>
    		<div className="hr"></div>
    		<div className="foot-lnk">
    			<a href="/forgotpassword">Forgot Password?</a>
    		</div>
    	</form>
    );
  }
}

export default withRouter(Login);
