import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class MyChallenges extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        <div key={i}>
          <div>{challenge.name}</div>
          <div>{challenge.tagline}</div>
          <a href={"/viewsubmissions/" + challenge.challenge_id}>View Submissions</a>
        </div>
			  );

  			this.setState({
  				challenges: challengeDivs
  			});
      }
		});
  }

  render() {
    return (
      <div>
      {this.state.challenges}
      </div>
    );
  }
}
