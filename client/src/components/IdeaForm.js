import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/Form.css';
import { appendScript } from '../js/AppendScript.js';
import Navbar from './Navbar';
import PostSubmission from './PostSubmission';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class IdeaForm extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      challengeId: "",
      fullName: "",
      selectedOption: "",
      affiliation: "",
      phoneNumber: "",
      email: "",
      idea: "",
      submitted: false
    }

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleAffiliationChange = this.handleAffiliationChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleIdeaChange = this.handleIdeaChange.bind(this);
    this.submitIdea = this.submitIdea.bind(this);

  }

  handleFullNameChange(e) {
    this.setState({
      fullName: e.target.value
    })
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleAffiliationChange(e) {
    this.setState({
      affiliation: e.target.value
    })
  }

  handlePhoneNumberChange(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleIdeaChange(e) {
    this.setState({
      idea: e.target.value
    })
  }


  submitIdea(e) {
    e.preventDefault();
    console.log(this.state)

    fetch("/api/createidea", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        challengeId: this.state.challengeId,
        content: this.state.idea
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
    appendScript('https://cdn.jsdelivr.net/jquery.dirtyforms/2.0.0/jquery.dirtyforms.min.js');
    appendScript('https://cdn.jsdelivr.net/gh/duckevinwu/external-js@0.2/FormAnimation.min.js');

    var challengeId = this.props.match.params.challengeid

    this.setState({
      challengeId: challengeId
    });

  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="post-submission-page">
          <Navbar/>
          <PostSubmission/>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar/>
          <div className="centered">
            <img src="https://i.imgur.com/xnPtYXg.png" className="form-logo" alt="cc-logo"></img>
            <form className="submit-form">

              <div className="input-block">
                 <label htmlFor="q1" className="sb-label sb-name">What's your full name?</label>
                 <input type="text" id="q1" className="text-question sb-form-q" placeholder="John Doe"
                  value={this.state.fullName} onChange={this.handleFullNameChange}
                 />
              </div>

              <div className="input-block radio-q">
                 <ul className="radio-list">
                    <p className="q-text">Are you affiliated with or representing a company/organization?</p>
                    <li className="rl-element">
                       <input type="radio" id="yes" name="selector" className="radio-option" value='yes'
                        checked={this.state.selectedOption === 'yes'} onChange={this.handleOptionChange}
                       />
                       <label htmlFor="yes" id="yes-label" className="radio-label">
                       <span className="keyboard-button">Y</span>Yes
                       </label>
                       <div className="check"></div>
                    </li>
                    <li className="rl-element">
                       <input type="radio" id="no" name="selector" className="radio-option" value='no'
                        checked={this.state.selectedOption === 'no'} onChange={this.handleOptionChange}
                       />
                       <label htmlFor="no" id="no-label" className="radio-label">
                       <span className="keyboard-button">N</span>No
                       </label>
                       <div className="check"></div>
                    </li>
                 </ul>
              </div>

              <div className="input-block">
                 <label htmlFor="q3" className="sb-label sb-name">What company or organization do you work with?</label>
                 <input type="text" id="q3" className="text-question sb-form-q" placeholder="If you answered 'no' above, skip this question"
                  value={this.state.affiliation} onChange={this.handleAffiliationChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q4" className="sb-label sb-name">Phone number (with area code)</label>
                 <input type="tel" id="q4" className="text-question sb-form-q" placeholder="123-456-7890"
                  value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q5" className="sb-label sb-name">Email Address</label>
                 <input type="email" id="q5" className="text-question sb-form-q" placeholder="name@example.com"
                  value={this.state.email} onChange={this.handleEmailChange}
                 />
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q6" className="sb-label sb-idea">Please provide a summary of your idea (~500 words)</label>
                 <textarea id="q6" className="text-question sb-form-q textarea-q" value={this.state.idea} onChange={this.handleIdeaChange}></textarea>
              </div>

              <div className="input-block">
                 <button type="button" className="submit-button sb-form-q" onClick={this.submitIdea}>Submit</button>
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

export default withRouter(IdeaForm);
