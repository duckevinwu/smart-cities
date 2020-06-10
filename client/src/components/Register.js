import React from 'react';
import { withRouter } from 'react-router-dom';
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
      repeat: ""
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
    console.log(this.state)

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

      if (res.status === 200) {
        this.props.history.push('/dashboard');
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
      <form onSubmit={this.submitRegister}>
        <div>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>

          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} required />

          <br/>

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePasswordChange} required />

          <br/>

          <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" value={this.state.repeat} onChange={this.handleRepeatChange} required />

          <br/>

          <button type="submit">Register</button>
        </div>

        <div>
          <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
      </form>
    );
  }
}

export default withRouter(Register);
