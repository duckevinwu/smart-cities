import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/SubmissionCard.css';
import { convertDate } from '../js/ConvertDate.js';

class SubmissionCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      challenge: {}
    }

		this.clickEdit = this.clickEdit.bind(this);
    this.clickReview = this.clickReview.bind(this);
	}

  componentDidMount() {
    this.setState({
      challenge: this.props.challenge
    })
  }

	clickEdit() {
    var url = '/editchallenge/' + this.state.challenge.challenge_id;
    this.props.history.push(url);
  }

  clickReview() {
    var url = '/viewsubmissions/' + this.state.challenge.challenge_id;
    this.props.history.push(url);
  }

	render() {
		return (
      <div className={"admin-card " + this.state.challenge.color + "-card"}>
         <div className="admin-upper">
            <div className={"admin-card-title " + this.state.challenge.color + "-title"}>{this.state.challenge.name}</div>
            <div className="admin-description">
               {this.state.challenge.tagline}
            </div>
         </div>
         <div className="lower">
            <hr className={"admin-divider " + this.state.challenge.color + "-hr"} />

            <div className="admin-bottom">
               <div className="admin-buttonWrap">
							 		<button type="button" className="review edit-button" onClick={this.clickEdit}> Edit </button>
                  <button type="button" className="review" onClick={this.clickReview}> Review </button>
               </div>
               <div className="admin-timeframe"><i className="fa fa-clock-o"></i> {convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}
               </div>
               <div className="admin-participants"><i className="fa fa-user"></i> {this.state.challenge.sum} solvers
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
