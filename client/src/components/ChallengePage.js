import React from 'react';
import DOMPurify from 'dompurify';
import Submission from './Submission'
import { appendScript } from '../js/AppendScript.js';
import { convertDate } from '../js/ConvertDate.js';
import { withRouter } from 'react-router-dom';
import '../style/ChallengePage.css';
import Navbar from './Navbar';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class ChallengePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
      challengeId: "",
      challenge: {},
      isSolver: false,
      showPopup: '',
      buttonLoading: false,
      loggedIn: false
    }

    this.clickActiveSolver = this.clickActiveSolver.bind(this);
    this.closePopup = this.closePopup.bind(this);

  }


  // React function that is called when the page load.
  componentDidMount() {

    appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');

    var id = this.props.match.params.id;

    this.setState({
      challengeId: id
    })

    var detailsUrl = '/api/challengedetails/' + id;
    var solverUrl = '/api/issolver/' + id;

    var promises = Promise.all([
			fetch(detailsUrl),
			fetch(solverUrl)
		])

		promises
			.then((results) =>
				Promise.all(results.map(r => r.json()))
			)
			.then((data) => {
				var challengeObj = data[0];
				var solverObj = data[1];

				this.setState({
					challenge: challengeObj.challenge[0],
          isSolver: data[1].isSolver,
          loggedIn: data[1].loggedIn,
					isLoaded: true
				})

			});
  }

  clickActiveSolver() {

    if (!this.state.loggedIn) {
      this.props.history.push("/login?redirect=" + this.props.location.pathname);
    }

    this.setState({
      buttonLoading: true
    })

    fetch("/api/becomesolver", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        challengeId: this.state.challengeId
      })
    })
    .then(res => {
      return res.json();
    }, err => {
      console.log(err);
    })
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        // handle success
        var challengeObj = this.state.challenge;
        challengeObj.sum += 1;

        this.setState({
          showPopup: "popup-show",
          challenge: challengeObj,
          buttonLoading: false,
          isSolver: true
        });
      } else {
        // handle errors
      }
    });

  }

  closePopup() {
    this.setState({
      showPopup: ""
    })
  }

  render() {
    if (this.state.isLoaded) {

      // logic for sections of page where user IS NOT an active solver
      var tabs = (
        <ul id="myTab2" role="tablist" className="nav nav-tabs nav-pills with-arrow lined flex-column flex-sm-row text-center">
          <li className="nav-item tab-head">
             <a id="home2-tab" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true"
                className="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 active">Detail</a>
          </li>
        </ul>
      )

      var button = (
        <button type="button" className="button-as" onClick={this.clickActiveSolver}>
          Become an Active Solver
        </button>
      )

      if (this.state.buttonLoading) {
        button = (
          <div className="spinner-wrapper">
            <div className="spinner-login"></div>
          </div>
        )
      }

      var tabContent = (
        <div id="myTab2Content" className="tab-content">
           <div id="home2" role="tabpanel" aria-labelledby="home-tab" className="tab-pane fade px-4 py-5 show active">
              <div id="challenge-info">
                 <section className="cd-brief">
                    <h3 className="brief-title"> Brief </h3>
                    <div className="section-content ql-editor"
                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.challenge.brief, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                    </div>
                 </section>
                 <section className="cd-become-solver">
                    {button}
                    <details className="as-info">
                      <summary className="as-text-title">What does this mean for you?</summary>
                      <div className="as-details">
                        <p>
                          By becoming an <font className="goldText">Active Solver</font> of this challenge, you will:
                        </p>
                        <ul className="details-list">
                          <li>Gain access to information essential to crafting your solution, including a deep dive into the challenge and a list of resources and existing assets you could use.</li>
                          <li>Have the ability to submit your solution for expert review and a chance at winning the listed prize.</li>
                          <li>Show your interest and support in solving this important urban challenge!</li>
                        </ul>
                      </div>
                    </details>
                 </section>
              </div>
           </div>
        </div>
      )

      // logic for sections of page where user IS an active solver
      if (this.state.isSolver) {
        tabs = (
          <ul id="myTab2" role="tablist" className="nav nav-tabs nav-pills with-arrow lined flex-column flex-sm-row text-center">
             <li className="nav-item tab-head">
                <a id="home2-tab" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true"
                   className="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 active">Detail</a>
             </li>
             <li className="nav-item tab-head">
                <a id="prize-tab" data-toggle="tab" href="#prize" role="tab" aria-controls="prize" aria-selected="false"
                   className="nav-link text-uppercase font-weight-bold rounded-0">Prize</a>
             </li>
             <li className="nav-item tab-head">
                <a id="profile2-tab" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile2"
                   aria-selected="false" className="nav-link text-uppercase font-weight-bold rounded-0">Submission</a>
             </li>
          </ul>
        )

        tabContent = (
          <div id="myTab2Content" className="tab-content">
             <div id="home2" role="tabpanel" aria-labelledby="home-tab" className="tab-pane fade px-4 py-5 show active">
                <div id="challenge-info">
                   <section className="cd-brief">
                      <h3 className="brief-title"> Brief </h3>
                      <div className="section-content ql-editor"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.challenge.brief, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                      </div>
                   </section>
                   <section className="cd-description">
                      <h3 className="description-title">Deep Dive</h3>
                      <div className="section-content ql-editor"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.challenge.description, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                      </div>
                   </section>
                   <section className="cd-assets">
                      <h3 className="assets-title">Additional Resources</h3>
                      <div className="section-content ql-editor"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.challenge.resources, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                      </div>
                   </section>
                </div>
             </div>
             <div id="prize" role="tabpanel" aria-labelledby="prize-tab" className="tab-pane fade px-4">
               <section className="cd-prize">
                  <h3 className="prize-title">Prize Details</h3>
                  <div className="section-content ql-editor"
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.challenge.prize, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                  </div>
               </section>
             </div>
             <div id="profile2" role="tabpanel" aria-labelledby="profile-tab" className="tab-pane fade px-4">
                <Submission challengeId={this.state.challengeId} details={this.state.challenge.submission} />
             </div>
          </div>
        )
      }

      return (
        <div>
        <div className={"popup-container " + this.state.showPopup} onClick={this.closePopup}>
          <div className="popup-content">
            <span id="close">&times;</span>
            <p className="popup-title">Welcome aboard</p>
            <p className="popup-text">
              You are officially an Active Solver for <font className={(this.state.challenge.color || 'green') + '-title'}>{this.state.challenge.name}</font>!
            </p>
          </div>
        </div>
        <Navbar/>
        <div className="container py-5 cd-page">
          <div className="shadow mb-5 details-card">
          <div className="card-content">
             <img src={this.state.challenge.logourl || 'https://i.imgur.com/jMSGGPk.png'} className={"cd-logo " + this.state.challenge.color + "-img"}/>
             <div className="cd-details">
                <div className="cd-timeframe"><i className="fa fa-clock-o"></i> {convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}
                </div>
                <div className="cd-participants"><i className="fa fa-user"></i> {this.state.challenge.sum} solvers
                </div>
                <div className="cd-reward"><i className="fa fa-trophy"></i> {this.state.challenge.reward}
                </div>
             </div>
             <h1 className="cd-title">{this.state.challenge.name}</h1>
             <br/>
             <div className="cd-tagline">
                <p>{this.state.challenge.tagline}</p>
             </div>
             </div>
             <br/>
             {tabs}
             {tabContent}
          </div>
      </div>
      </div>
      );
    } else {
      return (
        <div>
          <Preloader/>
        </div>
      );
    }
  }
}

export default withRouter(ChallengePage);
