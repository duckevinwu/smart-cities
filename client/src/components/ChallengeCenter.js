import React from 'react';
import ChallengeCard from './ChallengeCard';
import '../style/ChallengeCenter.css';
import Navbar from './Navbar';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ChallengeCenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      challenges: []
    }
  }

  // React function that is called when the page load.
  componentDidMount() {
    fetch("/api/allchallenges",
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
          <ChallengeCard
            key={i}
            challengeInfo={challenge}
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
        <div className="challenge-page">
          <Navbar/>
          <h1 id="title">challenge center</h1>
          <div className="grid">
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
