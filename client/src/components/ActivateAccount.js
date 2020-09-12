import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/ActivateAccount.css';
import Navbar from './Navbar';
import Preloader from './Preloader';
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
        <div className="ps-wrapper">
          <h1 className="thank-you-text">
            Success! Your profile = activated.
          </h1>
          <br/>
          <a href="/login" className="back-profile">Login Now</a>
        </div>
      );
    } else if (this.state.isLoaded && !this.state.isValid) {
      return (
        <div className="ps-wrapper">
          <h1 className="thank-you-text">
            Invalid link - please try again.
          </h1>
          <br/>
          <a href="/login" className="back-profile">Register</a>
        </div>
      );
    } else {
      return (
        <div>
          <Preloader/>
        </div>
      );
    }

  }
}

export default withRouter(ActivateAccount);
