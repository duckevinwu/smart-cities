import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Dashboard extends React.Component {
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

  submitRegister() {
    console.log(this.state)
  }

  // React function that is called when the page load.
  componentDidMount() {

  }

  render() {
    return (
      <form action="#">
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

          <button onClick={this.submitRegister}>Register</button>
        </div>

        <div>
          <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
      </form>
    );
  }
}
