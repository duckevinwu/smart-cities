import React from 'react';
import ProfileCard from './ProfileCard';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
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
      var profile = <ProfileCard authenticated={data.authenticated} userId={data.userId} />;
      this.setState({
        isLoaded: true,
        profileCard: profile
      })
		});
  }

  render() {
    if (this.state.isLoaded) {
      return(
        <div>
          {this.state.profileCard}
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}
