import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/SubmissionCard.css';
import { convertDate } from '../js/ConvertDate.js';

class SubmissionCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      challenge: {},
			colorStyle: "",
			imgUrl: ""
    }

    this.clickReview = this.clickReview.bind(this);
	}

  componentDidMount() {
    this.setState({
      challenge: this.props.challenge
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
		})
  }

  clickReview() {
    var url = '/viewsubmissions/' + this.state.challenge.challenge_id;
    this.props.history.push(url);
  }

	render() {
		return (
      <div className={"admin-card " + this.state.colorStyle + "-card"}>
         <div className="admin-upper">
            <div className={"admin-card-title " + this.state.colorStyle + "-title"}>{this.state.challenge.name}</div>
            <div className="admin-description">
               {this.state.challenge.tagline}
            </div>
         </div>
         <div className="lower">
            <hr className={"admin-divider " + this.state.colorStyle + "-hr"} />

            <div className="admin-bottom">
               <div className="admin-buttonWrap">
                  <button type="button" className="review" onClick={this.clickReview}> Review </button>
               </div>
               <div className="admin-timeframe"><i className="fa fa-clock-o"></i> {convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}
               </div>
               <div className="admin-participants"><i className="fa fa-user"></i> {this.state.challenge.sum} participants
               </div>
               <div className="admin-reward"><i className="fa fa-trophy"></i> {this.state.challenge.reward}
               </div>
            </div>
         </div>
      </div>
		);
	}
}

export default withRouter(SubmissionCard);
