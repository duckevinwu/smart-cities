import React from 'react';
import SubmissionCard from './SubmissionCard';
import Navbar from './Navbar';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class MyChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      challenges: []
    }
  }

  // React function that is called when the page load.
  componentDidMount() {
    fetch("/api/mychallenges",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      if (data.status === 'success') {
        var challengeList = data.challenges;
        let challengeDivs = challengeList.map((challenge, i) =>
          <SubmissionCard
            key={i}
            challenge={challenge}
          />
			  );

  			this.setState({
          isLoaded: true,
  				challenges: challengeDivs
  			});
      }
		});
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="mc-page">
          <Navbar />
          <h1 id="admin-title"> dashboard </h1>
          <div className="admin-grid">
            {this.state.challenges}
          </div>
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
