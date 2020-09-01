import React from 'react';
import UserIdeasRow from './UserIdeasRow';
import '../style/UserIdeas.css';

export default class UserIdeas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
      isLoaded: false
    }

  }

  componentDidMount() {
    fetch("/api/userideas/",
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
          <UserIdeasRow
            key={i}
            idea={idea}
          />
			  );

  			this.setState({
  				ideas: ideaDivs,
          isLoaded: true
  			});
      }
		});
  }

  render() {
    if (this.state.isLoaded) {
      if (this.state.ideas.length === 0) {
        return (
          <div className="ui-none-wrapper">
            <p className="ui-none-text">Your submissions for our challenges will show up here.</p>
            <p className="ui-none-text">Visit the <a href="/challengecenter" className="ui-link">Challenge Center</a> to get started!</p>
          </div>
        )
      } else {
        return(
          <div className="table-wrapper">
            <table className="submission-list">
              <tbody>
                <tr>
                  <th className="list-title">Challenge Title</th>
                  <th className="list-date">Date Submitted</th>
                  <th className="list-status">Status</th>
                </tr>
                {this.state.ideas}
              </tbody>
            </table>
          </div>
        );
      }
    } else {
      return (
        <div className="vs-spinner-wrapper">
          <div className="vs-spinner"></div>
        </div>
      )
    }
  }

}
