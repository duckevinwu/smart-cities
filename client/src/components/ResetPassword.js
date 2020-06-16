import React from 'react';
import { withRouter } from 'react-router-dom';
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
      repeat: ""
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
    console.log(this.state);

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
      return (
        <form onSubmit={this.submitReset}>
          <div>
            <h1>Reset Password</h1>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter New Password" value={this.state.password} onChange={this.handlePasswordChange} required />

            <br/>

            <label htmlFor="password-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" value={this.state.repeat} onChange={this.handleRepeatChange} required />
            <br/>

            <button type="submit">Reset Password</button>
          </div>
        </form>
      );
    } else if (this.state.isLoaded && !this.state.isValid) {
      return (
        <div>
          <p>Invalid link - please try <a href="/forgotpassword">Forgot Password</a> again.</p>
        </div>
      );
    } else {
      return (<div></div>);
    }

  }
}

export default withRouter(ResetPassword);
