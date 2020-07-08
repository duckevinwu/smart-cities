import React from 'react';
import { withRouter } from 'react-router-dom';
import { convertDate } from '../js/ConvertDate.js';

class ChallengeCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      challenge: {}
    }

    this.clickCard = this.clickCard.bind(this);
	}

  componentDidMount() {
    this.setState({
      challenge: this.props.challengeInfo
    })
  }

  clickCard() {
    var url = '/challenges/' + this.state.challenge.challenge_id;
    this.props.history.push(url);
  }

	render() {
		return (
      <div className="card zoom" onClick={this.clickCard} >
          <div className="upper">
              <div className="card-title">{this.state.challenge.name}</div>
              <div className="description">{this.state.challenge.tagline}</div>
          </div>
          <div className="lower">
              <hr className="divider" />
              <div className="bottom">
                  <img src="https://i.ibb.co/GJb79fh/Frame-3.png" className="challenge-logo"/>
                  <div className="timeframe"><i className="fa fa-clock-o"></i> {convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}</div>
                  <div className="participants"><i className="fa fa-user"></i> {this.state.challenge.sum} participants</div>
                  <div className="reward"><i className="fa fa-trophy"></i> {this.state.challenge.reward}</div>
              </div>
          </div>
      </div>
		);
	}
}

export default withRouter(ChallengeCard);
