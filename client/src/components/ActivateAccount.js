import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/ActivateAccount.css';
import Navbar from './Navbar';
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
        <div className="aa-wrapper">
          <Navbar/>
          <div className="aa-page">
            <h1 className="confirmation"> Your account has been activated
              <br/>
              Click <a className="login-link" href="/login">here</a> to login
            </h1>

            <div className="night">
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
              <div className="shooting_star"></div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.isLoaded && !this.state.isValid) {
      return (
        <div>
          <p>Invalid link - please try to <a href="/login">register</a> again.</p>
        </div>
      );
    } else {
      return (<div></div>);
    }

  }
}

export default withRouter(ActivateAccount);
