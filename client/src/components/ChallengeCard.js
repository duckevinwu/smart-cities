import React from 'react';
import { withRouter } from 'react-router-dom';
import { convertDate } from '../js/ConvertDate.js';

class ChallengeCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      challenge: {},
			colorStyle: "",
			imgUrl: ""
    }

    this.clickCard = this.clickCard.bind(this);
	}

  componentDidMount() {
    this.setState({
      challenge: this.props.challengeInfo
    }, () => {

			// for demo purposes
			if (this.state.challenge.challenge_id === 16) {
				this.setState({
					colorStyle: "blue",
					imgUrl: "https://i.imgur.com/ifddqXx.jpg"
				});
			} else if (this.state.challenge.challenge_id === 17) {
				this.setState({
					colorStyle: "yellow",
					imgUrl: "https://i.imgur.com/Zp0JMqp.png"
				});
			} else if (this.state.challenge.challenge_id === 18) {
				this.setState({
					colorStyle: "purple",
					imgUrl: "https://i.ibb.co/GJb79fh/Frame-3.png"
				});
			} else if (this.state.challenge.challenge_id === 19) {
				this.setState({
					colorStyle: "green",
					imgUrl: "https://i.imgur.com/vtvDuE0.png"
				});
			} else {
				this.setState({
					colorStyle: "green",
					imgUrl: "https://i.ibb.co/GJb79fh/Frame-3.png"
				});
			}

			// end demo
		}
		)

  }

  clickCard() {
    var url = '/challenges/' + this.state.challenge.challenge_id;
    this.props.history.push(url);
  }

	render() {
		return (
      <div className={"card zoom " + this.state.colorStyle + "-card"} onClick={this.clickCard} >
          <div className="upper">
              <div className={"card-title " + this.state.colorStyle + "-title"}>{this.state.challenge.name}</div>
              <div className="description">{this.state.challenge.tagline}</div>
          </div>
          <div className="lower">
              <hr className={"divider " + this.state.colorStyle + "-hr"} />
              <div className="bottom">
                  <img src={this.state.imgUrl} className={"challenge-logo " + this.state.colorStyle + "-img"}/>
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
