import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Preloader from './Preloader';
import FlashMessage from './FlashMessage';
import '../style/ResetPassword.css';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      token: "",
      time: "",
      isLoaded: false,
      isValid: false,
      password: "",
      repeat: "",
      loading: false
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
    this.submitReset = this.submitReset.bind(this);

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

  submitReset(e) {
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

    fetch("/reset", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: this.state.email,
        newPassword: this.state.password,
        time: this.state.time
      })
    })
    .then(res => {
			return res.json();
		}, err => {
			console.log(err);
		})
    .then(data => {
      console.log(data);
      // change state of component depending on response (error or success)
      if (data.status === 'success') {
        this.props.history.push('/login');
      }
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
    var email = this.props.match.params.email;
    var token = this.props.match.params.token;

    this.setState({
      email: email,
      token: token
    })

    fetch("/reset/" + email + '/' + token,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data);
      if (data.status === 'success') {
        this.setState({
          isValid: true,
          time: data.time
        })
      }

      this.setState({
        isLoaded: true
      })

		});
  }

  render() {

    if (this.state.isLoaded && this.state.isValid) {

      var errorDiv = this.state.error ? <FlashMessage message={this.state.error}/> : <div></div>

      var resetBtn = <button type="submit" className="reset"> Reset Password </button>;

      if (this.state.loading) {
        resetBtn = (
          <div className="spinner-wrapper">
            <div className="spinner-login"></div>
          </div>
        )
      }

      return (
        <div className="forgotpw-page">
          <Navbar/>
          <div className="resetpw-wrap">
        	<form className="resetpw-html" onSubmit={this.submitReset}>
        		<input id="resetpw-tab" type="radio" name="reset-pw-tab" className="reset-pw" defaultChecked/>
            <label for="resetpw-tab" className="reset-tab">Reset password</label>

        		<div className="reset-form">
        			<div className="reset-htm">
        				<div className="rs-group">
        					<label htmlFor="rs-user" className="rs-label">
                    New password
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext password-help">
                        Password should be at least 6 characters long
                       </span>
                    </div>
                  </label>
        					<input id="rs-pw" type="password" className="rs-pw" value={this.state.password} onChange={this.handlePasswordChange} required/>

                  <br/>

                  <label htmlFor="rs-user" className="rs-label">Re-enter password</label>
        					<input id="rs-pw-2" type="password" className="rs-pw" value={this.state.repeat} onChange={this.handleRepeatChange} required/>
        				</div>
                <div className="reset-button">
                  {resetBtn}
                </div>
        				<div className="reset-hr"></div>
        			</div>
        		</div>
            {errorDiv}
        	</form>
        </div>
      </div>
      );
    } else if (this.state.isLoaded && !this.state.isValid) {
      return (
        <div>
          <p>Invalid link - please try <a href="/forgotpassword">Forgot Password</a> again.</p>
        </div>
      );
    } else {
      return (
        <div>
          <Preloader/>
        </div>);
    }

  }
}

export default withRouter(ResetPassword);
