import React from 'react';
import '../style/ForgotPassword.css';
import Navbar from './Navbar';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      isSent: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);

  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  submitEmail(e) {
    e.preventDefault();
    console.log(this.state);

    fetch("/forgotpassword", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: this.state.email,
      })
    })
    .then(res => {
			return res.json();
		}, err => {
			console.log(err);
		})
    .then(data => {
      console.log(data);
      // change state of componenet depending on response (error or success)
      if (data.status === 'success') {
        this.setState({
          isSent: true
        })
      } else {
        // display the failure message
      }
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
  }

  render() {
    if (this.state.isSent) {
      return (
        <div className="forgotpw-page">
          <Navbar />
          <div className="forgotpw-wrap">
             <form className="forgotpw-html" onSubmit={this.submitEmail} >
                <input id="forgotpw-tab" type="radio" name="forgot-pw-tab" className="forgot-pw" defaultChecked />
                <label htmlFor="forgotpw-tab" className="fp-tab">Forgot password</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" />
                <label htmlFor="tab-2" className="tab"></label>
                <div className="login-form">
                   <div className="sign-in-htm">
                      <div>
                        <p className="email-sent">Please check your email to reset your password.</p>
                      </div>
                      <div className="hr"></div>
                   </div>
                </div>
             </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="forgotpw-page">
          <Navbar/>
          <div className="forgotpw-wrap">
             <form className="forgotpw-html" onSubmit={this.submitEmail} >
                <input id="forgotpw-tab" type="radio" name="forgot-pw-tab" className="forgot-pw" defaultChecked />
                <label htmlFor="forgotpw-tab" className="fp-tab">Forgot password</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" />
                <label htmlFor="tab-2" className="tab"></label>
                <div className="login-form">
                   <div className="sign-in-htm">
                      <div className="group">
                         <label htmlFor="user" className="label">Email</label>
                         <input id="user" type="text" className="input" value={this.state.email} onChange={this.handleEmailChange}/>
                      </div>
                      <div className="forgotpw-section">
                         <button type="button" className="forgotpw-button"> Reset Password</button>
                      </div>
                      <div className="hr"></div>
                   </div>
                </div>
             </form>
          </div>
        </div>
      );
    }
  }
}
