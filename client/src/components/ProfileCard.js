import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { appendScript } from '../js/AppendScript.js';
import '../style/ProfileCard.css';
import UserIdeas from './UserIdeas';
import Preloader from './Preloader';

class ProfileCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
			numIdeas: 0,
			numProposals: 0,
			isLoaded: false,
			user: {}
    }
	}

	componentDidMount() {
		appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');

		var ideaCountUrl = '/api/numideas';
		var proposalCountUrl = '/api/numproposals';
		var userInfoUrl = '/api/userinfo';

		var promises = Promise.all([
			fetch(ideaCountUrl),
			fetch(proposalCountUrl),
			fetch(userInfoUrl)
		])

		promises
			.then((results) =>
				Promise.all(results.map(r => r.json()))
			)
			.then((data) => {
				var ideasObj = data[0];
				var proposalsObj = data[1];
				var userObj = data[2];

				this.setState({
					numIdeas: ideasObj.numIdeas,
					numProposals: proposalsObj.numProposals,
					user: userObj.user,
					isLoaded: true
				})

			});

	}

	render() {

		if (this.state.isLoaded) {
			if (this.props.authenticated === 'true') {
	      return (
					<div className="profile-page">
	        <Navbar/>
	        <div className="container py-5 profile-card">
	          <div className="shadow mb-5 profile-background">
	          <div className="card-content">
						<div className="container-body">
							<div className="edit-icon">
								<a href="/editprofile"><i className="fa fa-pencil pencil" title="Edit Profile"></i></a>
							</div>
							<div className="profile-picture">
								<img src="https://i.imgur.com/sFUkpIV.png" alt="profile-pic"/>
							</div>
							<div className="profile-name">
								<p className="profile-name-text">{this.state.user.name}</p>
							</div>
							<div className="profile-location">
								<p>{this.state.user.city}, {this.state.user.state}</p>
							</div>
							<div className="profile-bio">
								<pre>{this.state.user.bio}</pre>
							</div>
							<div className="profile-stats">
								<div className="profile-ideas">
									 <p className="ideas-title">Ideas</p>
									 <h2>{this.state.numIdeas}</h2>
								</div>
								<div className="profile-proposals">
									 <p>Proposals</p>
									 <h2>{this.state.numProposals}</h2>
								</div>
								<div className="profile-imps">
									 <p>Implementations</p>
									 <h2>0</h2>
								</div>
							</div>
							</div>
	             </div>
	             <br/>
	             <ul id="myTab2" role="tablist" className="nav nav-tabs nav-pills with-arrow lined flex-column flex-sm-row text-center">
	                <li className="nav-item flex-sm-fill">
	                   <a id="home2-tab" data-toggle="tab" href="#ideas" role="tab" aria-controls="home2" aria-selected="true"
	                      className="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 active">Ideas</a>
	                </li>
	                <li className="nav-item flex-sm-fill">
	                   <a id="profile2-tab" data-toggle="tab" href="#submissions" role="tab" aria-controls="profile2"
	                      aria-selected="false" className="nav-link text-uppercase font-weight-bold rounded-0">Proposals</a>
	                </li>
	             </ul>
	             <div id="myTab2Content" className="tab-content">
	                <div id="ideas" role="tabpanel" aria-labelledby="home-tab" className="tab-pane fade px-4 py-5 show active">
										<UserIdeas/>
	                </div>
	                <div id="submissions" role="tabpanel" aria-labelledby="profile-tab" className="tab-pane fade px-4 py-5">

	                </div>
	             </div>
	          </div>
	      </div>
	      </div>
	  		);
	    } else {
	      return (
	        <div className="ps-wrapper">
						<h1 className="thank-you-text"> Oops! You have to be logged in to view your profile. </h1>

						<div className="login-now">
							<a type="button" href="/login" className="back-profile"> Login now</a>
						</div>
	        </div>
	      )
	    }
		} else {
			return (
				<div>
					<Preloader/>
				</div>
			);
		}
	}
}

export default withRouter(ProfileCard);
