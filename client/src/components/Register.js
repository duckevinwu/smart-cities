import React from 'react';
import { withRouter } from 'react-router-dom';
import FlashMessage from './FlashMessage';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class Register extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      password: "",
      repeat: "",
      isSent: false,
      error: "",
      loading: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);

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

  handleRepeatChange(e) {
    this.setState({
      repeat: e.target.value
    })
  }

  submitRegister(e) {
    e.preventDefault();


    if (this.state.password.length <= 6) {
      this.setState({
        error: 'Password should be at least 6 characters long'
      })
      return;
    }

    if (this.state.password !== this.state.repeat) {
      this.setState({
        error: 'Passwords do not match'
      })
      return;
    }

    this.setState({
      loading: true
    })

    fetch("/register", {
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
        this.setState({
          isSent: true
        })
      } else {
        // handle errors
        this.setState({
          error: data.message
        })
      }

      this.setState({
        loading: false
      })

    });

  }

  // React function that is called when the page load.
  componentDidMount() {

  }

  render() {
    if (this.state.isSent) {
      return (
        <div className="sign-up-htm">
          <p class="email-sent">
            Thank you for registering!
            <br/> <br/>
            Please check your email to activate your account.
          </p>
        </div>
      );
    } else {

      var errorDiv = this.state.error ? <FlashMessage message={this.state.error}/> : <div></div>

      var signupBtn = <button type="submit" className="signup">Sign Up</button>;

      if (this.state.loading) {
        signupBtn = (
          <div className="spinner-wrapper">
            <div className="spinner-login"></div>
          </div>
        )
      }

      return (
        <form className="sign-up-htm" onSubmit={this.submitRegister}>
          <div className="group">
             <label htmlFor="user" className="label">Email</label>
             <input type="email" className="input" value={this.state.email} onChange={this.handleEmailChange} required/>
          </div>
          <div className="group">
             <label htmlFor="pass" className="label">Password</label>
             <input type="password" className="input" data-type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
          </div>
          <div className="group">
             <label htmlFor="pass" className="label">Repeat Password</label>
             <input type="password" className="input" data-type="password" value={this.state.repeat} onChange={this.handleRepeatChange} required/>
          </div>
          <div className="signup-button">
             {signupBtn}
          </div>
          {errorDiv}
       </form>
      );
    }
  }
}

export default withRouter(Register);
