import React from 'react';
import { withRouter } from 'react-router-dom'

class ChallengeCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      challengeId: ""
    }

    this.clickCard = this.clickCard.bind(this);
	}

  componentDidMount() {
    this.setState({
      challengeId: this.props.id
    })
  }

  clickCard() {
    var url = '/challenges/' + this.state.challengeId;
    this.props.history.push(url);
  }

	render() {
		return (
      <div className="card" onClick={this.clickCard} >
          <div className="upper">
              <div className="card-title">{this.props.name}</div>
              <div className="description">{this.props.tagline}</div>
          </div>
          <div className="lower">
              <hr className="divider" />
              <div className="bottom">
                  <img src="https://i.ibb.co/GJb79fh/Frame-3.png" className="challenge-logo"/>
                  <div className="timeframe"><i className="fa fa-clock-o"></i> 01/01/2020 - 12/31/2020</div>
                  <div className="participants"><i className="fa fa-user"></i> 10 participants</div>
                  <div className="reward"><i className="fa fa-trophy"></i> $5000</div>
              </div>
          </div>
      </div>
		);
	}
}

export default withRouter(ChallengeCard);
