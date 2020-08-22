import React from 'react';
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router-dom';
import '../style/Form.css';
import { appendScript } from '../js/AppendScript.js';
import Navbar from './Navbar';
import PostSubmission from './PostSubmission';
import FlashMessage from './FlashMessage';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class IdeaForm extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      challengeId: "",
      idea: "",
      isGroup: "",
      team: "",
      aboutYou: "",
      interview: "",
      otherInfo: "",
      submitted: false,
      error: ""
    }

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleIdeaChange = this.handleIdeaChange.bind(this);
    this.handleInterviewChange = this.handleInterviewChange.bind(this);
    this.handleAboutYouChange = this.handleAboutYouChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    this.submitIdea = this.submitIdea.bind(this);

  }

  handleOptionChange(e) {
    this.setState({
      isGroup: e.target.value
    })
  }

  handleTeamChange(e) {
    this.setState({
      team: e.target.value
    })
  }

  handleInterviewChange(e) {
    this.setState({
      interview: e.target.value
    })
  }

  handleAboutYouChange(e) {
    this.setState({
      aboutYou: e
    })
  }

  handleIdeaChange(e) {
    this.setState({
      idea: e
    })
  }

  handleOtherInfoChange(e) {
    this.setState({
      otherInfo: e
    })
  }


  submitIdea(e) {
    e.preventDefault();
    console.log(this.state)

    if (!this.state.idea || !this.state.aboutYou) {
      this.setState({
        error: 'Please fill in all required fields'
      })
      return;
    }

    const validate = window.confirm('Are you sure?');

    if (validate) {
      fetch("/api/createidea", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
          challengeId: this.state.challengeId,
          idea: this.state
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

  toolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    ['bold', 'italic', 'underline', 'link'],        // toggled buttons
    ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['video', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
  ];

  modules = {
    toolbar: this.toolbarOptions
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

      var errorDiv = this.state.error ? <FlashMessage message={this.state.error}/> : <div></div>

      return (
        <div>
          <Navbar/>
          <div className="centered">
            <img src="https://i.imgur.com/xnPtYXg.png" className="form-logo" alt="cc-logo"></img>
            <form className="submit-form" onSubmit={this.submitIdea}>
              <div className="input-block radio-q">
                 <ul className="radio-list">
                    <p className="q-text">Are you submitting on behalf of a group?</p>
                    <li className="rl-element">
                       <input type="radio" id="yes" name="group" className="radio-option" value='yes'
                        checked={this.state.isGroup === 'yes'} onChange={this.handleOptionChange} required
                       />
                       <label htmlFor="yes" id="yes-label" className="radio-label">
                       <span className="keyboard-button">Y</span>Yes
                       </label>
                       <div className="check"></div>
                    </li>
                    <li className="rl-element">
                       <input type="radio" id="no" name="group" className="radio-option" value='no'
                        checked={this.state.isGroup === 'no'} onChange={this.handleOptionChange}
                       />
                       <label htmlFor="no" id="no-label" className="radio-label">
                       <span className="keyboard-button">N</span>No
                       </label>
                       <div className="check"></div>
                    </li>
                 </ul>
              </div>

              <div className="input-block">
                 <label htmlFor="q3" className="sb-label sb-name">Name(s), email(s) of your team member(s)</label>
                 <input type="text" id="q3" className="text-question sb-form-q" placeholder="John Doe at johndoe@gmail.com, etc (optional)"
                  value={this.state.team} onChange={this.handleTeamChange}
                 />
              </div>

              <div className="input-block expand-block quill-block">
                <label htmlFor="q6">
                  <div className="quill-label">
                    <details>
                      <summary className="question-title">Solution Overview (1500 words or less)</summary>
                      <div className="details-text">
                        <p>
                          This is the most important part of your submission. Please describe your idea in comprehensive detail and explain how it addresses the needs of this challenge. Here are some additional points to think about:
                        </p>
                        <ul className="details-list">
                          <li>What distinguishes my solution from others, and what has prevented its adoption before now?</li>
                          <li>What stage is my idea at (e.g. concept, proof-of-concept, development, commercial, etc)?</li>
                          <li>Has my idea been implemented before? If so, in what context? </li>
                          <li>If applicable, how does my solution prioritize or benefit disadvantaged or marginalized sectors of our economy (e.g. individuals, businesses, etc.)?</li>
                          <li>If applicable, how does my solution prioritize data privacy and security? (If your solution is tech-enabled, this might apply to you)</li>
                        </ul>
                      </div>
                    </details>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.idea} onChange={this.handleIdeaChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block expand-block quill-block">
                <label htmlFor="about">
                  <div className="quill-label">
                  <details>
                    <summary className="question-title">About You (500 words or less)</summary>
                    <div className="details-text">
                      <p>
                        Please describe you and your team (if you have one). Here are some additional thoughts to consider:
                      </p>
                      <ul className="details-list">
                        <li>What relevant experiences and skill sets does my team possess to execute this idea?</li>
                        <li>What are my motivations to pursue this idea?</li>
                        <li>If my team wins this challenge, what are our future plans to advance our solution?</li>
                      </ul>
                    </div>
                  </details>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.aboutYou} onChange={this.handleAboutYouChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block radio-q">
                 <ul className="radio-list">
                    <p className="q-text">If you are selected as a finalist, would you (and your teammates, if you have any) be willing to participate in an interview?</p>
                    <li className="rl-element">
                       <input type="radio" id="yes1" name="interview" className="radio-option" value='yes'
                        checked={this.state.interview === 'yes'} onChange={this.handleInterviewChange} required
                       />
                       <label htmlFor="yes1" id="yes-label1" className="radio-label">
                       <span className="keyboard-button">Y</span>Yes
                       </label>
                       <div className="check"></div>
                    </li>
                    <li className="rl-element">
                       <input type="radio" id="no1" name="interview" className="radio-option" value='no'
                        checked={this.state.interview === 'no'} onChange={this.handleInterviewChange}
                       />
                       <label htmlFor="no1" id="no-label1" className="radio-label">
                       <span className="keyboard-button">N</span>No
                       </label>
                       <div className="check"></div>
                    </li>
                 </ul>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="about">
                  <div className="quill-label">Is there anything else you want to tell us that’s not reflected in the above questions? (optional)
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.otherInfo} onChange={this.handleOtherInfoChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block">
                 <button type="submit" className="submit-button sb-form-q">Submit</button>
                 {errorDiv}
              </div>
            </form>
          </div>
        </div>
      );
    }

  }
}

export default withRouter(IdeaForm);
