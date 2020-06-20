import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Submission extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoggedIn: false
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
      if (isAuthenticated === 'true') {
        this.setState({
          isLoggedIn: true
        });
      }
		});
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <a>Idea</a>
          <a>Proposal</a>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}
