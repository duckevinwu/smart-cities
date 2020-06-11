import React from 'react';
import ProfileCard from './ProfileCard';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      profileCard: ""
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
      var profile = <ProfileCard authenticated={data.authenticated} user={data.user} />;
      this.setState({
        profileCard: profile
      })
		});
  }

  render() {
    return(
      <div>
        {this.state.profileCard}
      </div>
    );
  }
}
