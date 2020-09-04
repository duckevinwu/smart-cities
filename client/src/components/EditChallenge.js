import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/Form.css';
import { appendScript } from '../js/AppendScript';
import { convertDateMsDash } from '../js/ConvertDate'
import Navbar from './Navbar';
import PostCreation from './PostCreation';
import ReactQuill from 'react-quill';
import Preloader from './Preloader';
//import PageNavbar from './PageNavbar';

class EditChallenge extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
      id: "",
      name: "",
      tagline: "",
      imageUrl: "",
      logoUrl: "",
      color: "",
      startDate: "",
      startDateString: "",
      endDate: "",
      endDateString: "",
      reward: "",
      category: "",
      brief: "",
      description: "",
      assets: "",
      resources: "",
      eligibility: "",
      contact: "",
      prize: "",
      submission: "",
      submitted: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTaglineChange = this.handleTaglineChange.bind(this);
    this.handleImageURLChange = this.handleImageURLChange.bind(this);
    this.handleLogoURLChange = this.handleLogoURLChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleRewardChange = this.handleRewardChange.bind(this);
    this.handleBriefChange = this.handleBriefChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAssetsChange = this.handleAssetsChange.bind(this);
    this.handleResourcesChange = this.handleResourcesChange.bind(this);
    this.handleEligibilityChange = this.handleEligibilityChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handlePrizeChange = this.handlePrizeChange.bind(this);
    this.handleSubmissionChange = this.handleSubmissionChange.bind(this);
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

  handleImageURLChange(e) {
    this.setState({
      imageUrl: e.target.value
    })
  }

  handleLogoURLChange(e) {
    this.setState({
      logoUrl: e.target.value
    })
  }

  handleColorChange(e) {
    this.setState({
      color: e.target.value
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
      brief: e
    })
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e
    })
  }

  handleAssetsChange(e) {
    this.setState({
      assets: e
    })
  }

  handleResourcesChange(e) {
    this.setState({
      resources: e
    })
  }

  handleEligibilityChange(e) {
    this.setState({
      eligibility: e
    })
  }

  handleContactChange(e) {
    this.setState({
      contact: e
    })
  }

  handlePrizeChange(e) {
    this.setState({
      prize: e
    })
  }

  handleSubmissionChange(e) {
    this.setState({
      submission: e
    })
  }


  submitChallenge(e) {
    e.preventDefault();

    const validate = window.confirm('Are you sure?');

    if (validate) {
      fetch("/api/editchallenge", {
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

  }

  // React function that is called when the page load.
  componentDidMount() {

    var challengeId = this.props.match.params.id;

    // get challenge details
    this.setState({
      id: challengeId
    })

    fetch("/api/challengeowneredit/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      if (data.status === 'success') {
        var challenge = data.challenge;
        this.setState({
          name: challenge.name,
          tagline: challenge.tagline,
          imageUrl: challenge.imgurl,
          logoUrl: challenge.logourl,
          color: challenge.color,
          startDate: convertDateMsDash(challenge.start),
          startDateString: challenge.start,
          endDate: convertDateMsDash(challenge.end),
          endDateString: challenge.end,
          reward: challenge.reward,
          brief: challenge.brief,
          description: challenge.description,
          resources: challenge.resources,
          prize: challenge.prize,
          submission: challenge.submission,
          contact: challenge.contact
        })

        appendScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
        appendScript('//cdn.jsdelivr.net/jquery.dirtyforms/2.0.0/jquery.dirtyforms.min.js');
        appendScript('https://cdn.jsdelivr.net/gh/duckevinwu/external-js@0.2/FormAnimation.min.js');

        this.setState({
          isLoaded: true
        });

      } else {
        this.props.history.push('/login?redirect=' + this.props.location.pathname);
      }

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

    if (!this.state.isLoaded) {
      return (
        <Preloader/>
      )
    }

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
            <form className="submit-form" id="create-form" onSubmit={this.submitChallenge}>
              <p className="form-heading">Challenge Card Information</p>

              <div className="input-block">
                 <label htmlFor="q1" className="sb-label sb-name">Challenge Name</label>
                 <input type="text" id="q1" className="text-question sb-form-q" placeholder=""
                  value={this.state.name} onChange={this.handleNameChange} required
                 />
              </div>

              <div className="input-block time-period">
                 <div className="tp-content">
                    <label htmlFor="q2" className="sb-label sb-timeframe">Time Period of Challenge:</label>
                    <input type="date" id="startdate" className="sb-date left"
                      value={this.state.startDate} onChange={this.handleStartDateChange} required
                    />
                    <span className="to">to</span>
                    <input type="date" id="enddate" className="sb-date right"
                      value={this.state.endDate} onChange={this.handleEndDateChange} required
                    />
                 </div>
              </div>

              <div className="input-block">
                 <label htmlFor="q3" className="sb-label sb-name">Prize amount</label>
                 <input type="text" id="q3" className="text-question sb-form-q" placeholder="(optional)"
                  value={this.state.reward} onChange={this.handleRewardChange}
                 />
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q5" className="sb-label sb-idea">Tagline for your challenge (2-4 sentences)</label>
                 <textarea id="q5" className="text-question sb-form-q textarea-q"
                  value={this.state.tagline} onChange={this.handleTaglineChange} required>
                 </textarea>
              </div>

              <div className="input-block">
                 <label htmlFor="q14" className="sb-label sb-name">Card Image Link</label>
                 <input type="text" id="q14" className="text-question sb-form-q"
                  value={this.state.imageUrl} onChange={this.handleImageURLChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q15" className="sb-label sb-name">Company Logo Link</label>
                 <input type="text" id="q15" className="text-question sb-form-q"
                  value={this.state.logoUrl} onChange={this.handleLogoURLChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q16" className="sb-label sb-name">Color of Card</label>
                 <select form="create-form" value={this.state.color} onChange={this.handleColorChange}
                  className="text-question sb-form-q"
                 >
                    <option value=""></option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                  </select>
              </div>

              <p className="form-heading">Challenge Details</p>

              <div className="input-block large-block quill-block">
                <label htmlFor="q6">
                  <div className="quill-label">Brief
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       Provide a general overview of the challenge in non-technical terms, as well as the motivation of the challenge.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.brief} onChange={this.handleBriefChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="q7">
                  <div className="quill-label">Deep Dive
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       A longer description with full details and technical terms.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.description} onChange={this.handleDescriptionChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="q9">
                  <div className="quill-label">Additional Resources
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       List any resources that might be useful for the solver to have for coming up with their solution.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.resources} onChange={this.handleResourcesChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="q12">
                  <div className="quill-label">Prize Details
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       Provide details about the prize that will be reward to the winner(s) of the challenge.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.prize} onChange={this.handlePrizeChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="q13">
                  <div className="quill-label">Submission Details
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       List any specific instructions or preferences you have for submitting a solution to the challenge.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.submission} onChange={this.handleSubmissionChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block large-block quill-block">
                <label htmlFor="q14">
                  <div className="quill-label">FAQ
                    <div className="tooltip"><i className="fa fa-question-circle"></i>
                       <span className="tooltiptext">
                       List any frequently asked questions and their answers for this challenge.
                       </span>
                    </div>
                  </div>
                </label>
                <ReactQuill modules={this.modules} theme="snow" value={this.state.contact} onChange={this.handleContactChange} className="sb-form-q quill-q"/>
              </div>

              <div className="input-block">
                 <button type="submit" className="submit-button sb-form-q">Submit</button>
              </div>
            </form>

            </div>
          </div>
      );
    }
  }
}

export default withRouter(EditChallenge);
