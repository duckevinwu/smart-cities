import React from 'react';
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class ActivateAccount extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      email: "",
      token: "",
      time: "",
      isLoaded: false,
      isValid: false
    }

  }


  // React function that is called when the page load.
  componentDidMount() {
    var email = this.props.match.params.email;
    var token = this.props.match.params.token;

    this.setState({
      email: email,
      token: token
    })

    fetch("/activate/" + email + '/' + token,
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
          isValid: true
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
        <div>
          <p>Your account was successfully activated!</p>
          <p>Click <a href="/login">here</a> to login.</p>
        </div>
      );
    } else if (this.state.isLoaded && !this.state.isValid) {
      return (
        <div>
          <p>Invalid link - please try to <a href="/register">register</a> again.</p>
        </div>
      );
    } else {
      return (<div></div>);
    }

  }
}

export default withRouter(ActivateAccount);
