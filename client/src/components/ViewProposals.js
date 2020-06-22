import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ViewProposals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposals: []
    }
  }

  // React function that is called when the page load.
  componentDidMount() {

    var challengeId = this.props.challengeId;

    fetch("/api/proposals/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      if (data.status === 'success') {
        var proposalList = data.proposals;
        let proposalDivs = proposalList.map((proposal, i) =>
        <div key={i}>
          <div>{proposal.email}</div>
          <div>{proposal.submit_time}</div>
        </div>
			  );

  			this.setState({
  				proposals: proposalDivs
  			});
      }
		});
  }

  render() {
    return (
      <div>
      {this.state.proposals}
      </div>
    );
  }
}
