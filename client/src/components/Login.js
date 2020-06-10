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
