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
			isLoaded: false
    }
	}

	componentDidMount() {
		appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');

		var ideaCountUrl = '/api/numideas';
		var proposalCountUrl = '/api/numproposals';

		var promises = Promise.all([
			fetch(ideaCountUrl),
			fetch(proposalCountUrl)
		])

		promises
			.then((results) =>
				Promise.all(results.map(r => r.json()))
			)
			.then((data) => {
				var ideasObj = data[0];
				var proposalsObj = data[1];

				this.setState({
					numIdeas: ideasObj.numIdeas,
					numProposals: proposalsObj.numProposals,
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
							<div className="profile-picture">
								<img src="https://i.imgur.com/euIw5lu.png" alt="profile-pic"/>
							</div>
							<div className="profile-name">
								<p className="profile-name-text">Yinhong Liu</p>
							</div>
							<div className="profile-location">
								<p>Nanjing, China</p>
							</div>
							<div className="profile-bio">
								<p>I am Yinhong Liu and I am Michael Jordan and LeBron James reincarnated. </p>
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
										Proposals
	                </div>
	             </div>
	          </div>
	      </div>
	      </div>
	  		);
	    } else {
	      return (
	        <div>
	          <p><a href="/login">Log in</a> to view.</p>
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
