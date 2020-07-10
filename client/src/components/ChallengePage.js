import React from 'react';
import Submission from './Submission'
import { appendScript } from '../js/AppendScript.js';
import { convertDate } from '../js/ConvertDate.js';
import '../style/ChallengePage.css';
import Navbar from './Navbar';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ChallengePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
      challengeId: "",
      challenge: {}
    }

  }


  // React function that is called when the page load.
  componentDidMount() {

    appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');

    var id = this.props.match.params.id;

    this.setState({
      challengeId: id,
      colorStyle: "",
      imgUrl: ""
    })

    fetch("/api/challengedetails/" + id,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data);

      this.setState({
        isLoaded: true,
        challenge: data.challenge[0]
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

		});
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
        <Navbar/>
        <div className="container py-5 cd-page">
          <div className="shadow mb-5 details-card">
          <div className="card-content">
             <img src={this.state.imgUrl} className={"cd-logo " + this.state.colorStyle + "-img"}/>
             <div className="cd-details">
                <div className="cd-timeframe"><i className="fa fa-clock-o"></i> {convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}
                </div>
                <div className="cd-participants"><i className="fa fa-user"></i> {this.state.challenge.sum} participants
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
             <ul id="myTab2" role="tablist" className="nav nav-tabs nav-pills with-arrow lined flex-column flex-sm-row text-center">
                <li className="nav-item flex-sm-fill">
                   <a id="home2-tab" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true"
                      className="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 active">Detail</a>
                </li>
                <li className="nav-item flex-sm-fill">
                   <a id="profile2-tab" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile2"
                      aria-selected="false" className="nav-link text-uppercase font-weight-bold rounded-0">Submission</a>
                </li>
             </ul>
             <div id="myTab2Content" className="tab-content">
                <div id="home2" role="tabpanel" aria-labelledby="home-tab" className="tab-pane fade px-4 py-5 show active">
                   <div id="challenge-info">
                      <section className="cd-brief">
                         <h3 className="brief-title"> Brief </h3>
                         <pre className="section-content">
                          {this.state.challenge.brief}
                         </pre>
                      </section>
                      <section className="cd-description">
                         <h3 className="description-title"> Description</h3>
                         <pre className="section-content">
                          {this.state.challenge.description}
                         </pre>
                      </section>
                      <section className="cd-assets">
                         <h3 className="assets-title">Existing Assets</h3>
                         <pre className="section-content">
                          {this.state.challenge.assets}
                         </pre>
                      </section>
                      <section className="cd-prize">
                         <h3 className="prize-title">Prize</h3>
                         <pre className="section-content">
                          {this.state.challenge.prize}
                         </pre>
                      </section>
                   </div>
                </div>
                <div id="profile2" role="tabpanel" aria-labelledby="profile-tab" className="tab-pane fade px-4 py-5">
                   <Submission challengeId={this.state.challengeId} />
                </div>
             </div>
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
