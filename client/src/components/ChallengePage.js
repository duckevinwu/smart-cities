import React from 'react';
import Submission from './Submission'
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ChallengePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
      challengeId: "",
      challenge: {}
    }

  }


  // React function that is called when the page load.
  componentDidMount() {
    var id = this.props.match.params.id;

    this.setState({
      challengeId: id
    })

    fetch("/api/challengedetails/" + id,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data);

      this.setState({
        isLoaded: true,
        challenge: data.challenge[0]
      })

		});
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <p>{this.state.challenge.challenge_id}</p>
          <p>{this.state.challenge.name}</p>
          <p>{this.state.challenge.tagline}</p>
          <Submission challengeId={this.state.challengeId}/>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}
