import React from 'react';
import '../style/UserIdeas.css';
import UserASRow from './UserASRow';

export default class UserActivelySolving extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [],
      isLoaded: false
    }
  }

  componentDidMount() {

    var ascList = this.props.asc;
    let ascDivs = ascList.map((challenge, i) =>
      <UserASRow
        key={i}
        challenge={challenge}
      />
    )

    this.setState({
      challenges: ascDivs,
      isLoaded: true
    })
  }

  render() {
    if (this.state.isLoaded) {
      if (this.state.challenges.length === 0) {
        return (
          <div className="ui-none-wrapper">
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
                  <th className="list-date">Timeframe</th>
                </tr>
                {this.state.challenges}
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
