import React from 'react';
import UserIdeasRow from './UserIdeasRow';
import '../style/UserIdeas.css';

export default class UserIdeas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: []
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
  				ideas: ideaDivs
  			});
      }
		});
  }

  render() {
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

}
