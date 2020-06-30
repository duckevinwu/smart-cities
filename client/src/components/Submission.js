import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Submission extends React.Component {
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
          <br/>
          <br/>
          <a href={"/submitproposal/" + this.props.challengeId}><button className="submitbutton">Submit Proposal</button></a>
        </div>
      );
    } else {
      return (
        <div class="login-text">
          Log in to submit
        </div>
      );
    }
  }
}
