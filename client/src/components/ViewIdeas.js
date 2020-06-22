import React from 'react';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ViewIdeas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: []
    }
  }

  // React function that is called when the page load.
  componentDidMount() {

    var challengeId = this.props.challengeId;

    fetch("/api/ideas/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      if (data.status === 'success') {
        var ideaList = data.ideas;
        let ideaDivs = ideaList.map((idea, i) =>
        <div key={i}>
          <div>{idea.email}</div>
          <div>{idea.submit_time}</div>
        </div>
			  );

  			this.setState({
  				ideas: ideaDivs
  			});
      }
		});
  }

  render() {
    return (
      <div>
      {this.state.ideas}
      </div>
    );
  }
}
