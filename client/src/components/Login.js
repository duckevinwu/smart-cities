import React from 'react';
import { withRouter } from 'react-router-dom'
import FlashMessage from './FlashMessage';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      password: "",
      redirectUrl: "",
      error: "",
      showError: false,
      loading: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.parseQueryString = this.parseQueryString.bind(this);

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


    this.setState({
      loading: true
    })

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
			return res.json();
		}, err => {
			console.log(err);
		})
    .then(data => {
      if (data.status === 'success') {
        if (!data.logged) {
          this.props.history.push('/editprofile');
        } else {
          var redirect = this.state.redirectUrl;
          if (redirect) {
            this.props.history.push(redirect)
          } else {
            this.props.history.push('/profile');
          }
        }
      } else {
        this.setState({
          error: data.message,
          showError: true
        })
      }

      this.setState({
        loading: false
      })

    });
  }

  parseQueryString(q) {
    var path = q.split('=')[1];
    return path;
  }

  // React function that is called when the page load.
  componentDidMount() {
    var redirectPath = this.parseQueryString(this.props.location.search);
    if (redirectPath) {
      this.setState({
        redirectUrl: redirectPath
      })
    }
  }

  render() {

    var errorDiv = (this.state.error && this.state.showError) ? <FlashMessage message={this.state.error}/> : <div></div>

    var loginBtn = <button type="submit" className="login">Login</button>;

    if (this.state.loading) {
      loginBtn = (
        <div className="spinner-wrapper">
          <div className="spinner-login"></div>
        </div>
      )
    }

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
                {loginBtn}
            </div>
    		<div className="hr"></div>
    		<div className="foot-lnk">
    			<a href="/forgotpassword">Forgot Password?</a>
    		</div>
        {errorDiv}
    	</form>
    );
  }
}

export default withRouter(Login);
