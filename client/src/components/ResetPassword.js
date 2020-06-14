import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
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

    fetch("/path", {
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
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
    console.log(this.props.match.params);
  }

  render() {
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
  }
}
