import React from 'react';
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class Submission extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoggedIn: false,
      userId: ""
    }

  }


  // React function that is called when the page load.
  componentDidMount() {
    fetch("/auth/isAuthenticated",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      var isAuthenticated = data.authenticated
      var id = data.userId
      if (isAuthenticated === 'true') {
        this.setState({
          isLoggedIn: true,
          userId: id
        });
      }
		});
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="submitbuttonwrapper">
          <a href={"/submitidea/" + this.props.challengeId}><button className="submitbutton">Submit Idea</button></a>
        </div>
      );
    } else {
      return (
        <div className="login-text">
          <a href={"/login?redirect=" + this.props.location.pathname} className="login-link">Login</a> to submit
        </div>
      );
    }
  }
}

export default withRouter(Submission);
