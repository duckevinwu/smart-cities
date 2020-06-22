import React from 'react';
import ViewIdeas from './ViewIdeas';
import ViewProposals from './ViewProposals';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ViewSubmissions extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isCorrectUser: false,
      isLoaded: false,
      challengeId: "",
      userId: ""
    }

  }


  // React function that is called when the page load.
  componentDidMount() {

    var challengeId = this.props.match.params.challengeid;

    this.setState({
      challengeId: challengeId
    });

    fetch("/api/challengeowner/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      if (data.status === 'success') {
        this.setState({
          isCorrectUser: true
        })
      }
      this.setState({
        isLoaded: true
      });
		});
  }

  render() {
    if (this.state.isLoaded) {
      if (this.state.isCorrectUser) {
        return (
          <div>
            <h2>Ideas</h2>
            <ViewIdeas challengeId={this.state.challengeId}/>
            <br/>
            <h2>Proposals</h2>
            <ViewProposals challengeId={this.state.challengeId}/>
          </div>
        );
      } else {
        return (
          <div>
            <p>Not authorized to view this page</p>
          </div>
        );
      }

    } else {
      return (<div></div>);
    }
  }
}
