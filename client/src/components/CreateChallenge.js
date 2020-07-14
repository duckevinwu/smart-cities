import React from 'react';
import '../style/Form.css';
import { appendScript } from '../js/AppendScript';
import Navbar from './Navbar';
import PostCreation from './PostCreation';
//import PageNavbar from './PageNavbar';

export default class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      name: "",
      tagline: "",
      startDate: "",
      startDateString: "",
      endDate: "",
      endDateString: "",
      reward: "",
      category: "",
      brief: "",
      description: "",
      assets: "",
      submitted: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTaglineChange = this.handleTaglineChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleRewardChange = this.handleRewardChange.bind(this);
    this.handleBriefChange = this.handleBriefChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAssetsChange = this.handleAssetsChange.bind(this);
    this.submitChallenge = this.submitChallenge.bind(this);

  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleTaglineChange(e) {
    this.setState({
      tagline: e.target.value
    })
  }

  handleStartDateChange(e) {
    console.log(e.target.value);
    var start = new Date(e.target.value);
    var startStr = start.getTime().toString();
    this.setState({
      startDate: e.target.value,
      startDateString: startStr
    })
  }

  handleEndDateChange(e) {
    var end = new Date(e.target.value);
    var endStr = end.getTime().toString();
    this.setState({
      endDate: e.target.value,
      endDateString: endStr
    })
  }

  handleRewardChange(e) {
    this.setState({
      reward: e.target.value
    })
  }

  handleBriefChange(e) {
    this.setState({
      brief: e.target.value
    })
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleAssetsChange(e) {
    this.setState({
      assets: e.target.value
    })
  }


  submitChallenge(e) {
    e.preventDefault();
    console.log(this.state)

    fetch("/api/createchallenge", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        challengeInfo: this.state
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
        this.setState({
          submitted: true
        });
      } else {
        // handle errors
      }
    });

  }

  // React function that is called when the page load.
  componentDidMount() {
    appendScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
    appendScript('https://cdn.jsdelivr.net/gh/duckevinwu/external-js@0.2/FormAnimation.min.js');
    appendScript('//cdn.jsdelivr.net/jquery.dirtyforms/2.0.0/jquery.dirtyforms.min.js');
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="post-submission-page">
          <Navbar/>
          <PostCreation/>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="centered">
            <img src="https://i.imgur.com/xnPtYXg.png" className="form-logo"></img>
            <form className="submit-form">
              <p className="form-heading">Challenge Card Information</p>

              <div className="input-block">
                 <label htmlFor="q1" className="sb-label sb-name">Challenge Name</label>
                 <input type="text" id="q1" className="text-question sb-form-q" placeholder=""
                  value={this.state.name} onChange={this.handleNameChange}
                 />
              </div>

              <div className="input-block time-period">
                 <div className="tp-content">
                    <label htmlFor="q2" className="sb-label sb-timeframe">Time Period of Challenge:</label>
                    <input type="date" id="startdate" className="sb-date left"
                      value={this.state.startDate} onChange={this.handleStartDateChange}
                    />
                    <span className="to">to</span>
                    <input type="date" id="enddate" className="sb-date right"
                      value={this.state.endDate} onChange={this.handleEndDateChange}
                    />
                 </div>
              </div>

              <div className="input-block">
                 <label htmlFor="q3" className="sb-label sb-name">Prize amount</label>
                 <input type="text" id="q3" className="text-question sb-form-q" placeholder="(optional)"
                  value={this.state.reward} onChange={this.handleRewardChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q4" className="sb-label sb-name">What company or organization are you posting for?</label>
                 <input type="text" id="q4" className="text-question sb-form-q" />
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q5" className="sb-label sb-idea">Tagline for your challenge (2-4 sentences)</label>
                 <textarea id="q5" className="text-question sb-form-q textarea-q" value={this.state.tagline} onChange={this.handleTaglineChange} ></textarea>
              </div>

              <p className="form-heading">Challenge Details</p>

              <div className="input-block large-block">
                 <label htmlFor="q6" className="sb-label sb-idea">
                    Brief
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       Provide a general overview of the challenge in non-technical terms, as well as the motivation of the challenge.
                       </span>
                    </div>
                 </label>
                 <textarea id="q6" className="text-question sb-form-q textarea-q" value={this.state.brief} onChange={this.handleBriefChange} ></textarea>
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q7" className="sb-label sb-idea">
                    Description
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       A longer description with full details and technical terms.
                       </span>
                    </div>
                 </label>
                 <textarea id="q7" className="text-question sb-form-q textarea-q" value={this.state.description} onChange={this.handleDescriptionChange} ></textarea>
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q8" className="sb-label sb-idea">
                    Existing Assets
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       List and describe any infrastructure or assets in Philadelphia that might be of use in the challenge. These could be assets that are public, under your company/organizations's control, or agreed upon by the city to use for this challenge.
                       </span>
                    </div>
                 </label>
                 <textarea id="q8" className="text-question sb-form-q textarea-q" value={this.state.assets} onChange={this.handleAssetsChange} ></textarea>
              </div>

              <div className="input-block">
                 <button type="button" className="submit-button sb-form-q" onClick={this.submitChallenge} >Submit</button>
              </div>
            </form>

            <div>
              <p className="form-info">Press <span className="keyboard-button tab-button-icon">TAB</span> to move to next question</p>
            </div>
            </div>
          </div>
      );
    }
  }
}
