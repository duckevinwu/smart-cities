import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: ""
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
    });
  }

  // React function that is called when the page load.
  componentDidMount() {
  }

  render() {
    return (
      <form onSubmit={this.submitEmail}>
        <div>
          <h1>Forgot Password</h1>

          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} required />
          <br/>
          <br/>

          <button type="submit">Send Confirmation Email</button>
        </div>
      </form>
    );
  }
}
