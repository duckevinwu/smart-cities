import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/Form.css';
import { appendScript } from '../js/AppendScript.js';
import Navbar from './Navbar';
import PostSubmission from './PostSubmission';
import Preloader from './Preloader';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoaded: false,
      authenticated: false,
      fullName: "",
      phoneNumber: "",
      title: "",
      state: "",
      city: "",
      bio: ""
    }

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.submitChanges = this.submitChanges.bind(this);

  }

  handleFullNameChange(e) {
    this.setState({
      fullName: e.target.value
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handlePhoneNumberChange(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  handleStateChange(e) {
    this.setState({
      state: e.target.value
    })
  }

  handleCityChange(e) {
    this.setState({
      city: e.target.value
    })
  }

  handleBioChange(e) {
    this.setState({
      bio: e.target.value
    })
  }


  submitChanges(e) {
    e.preventDefault();

    fetch("/api/updateprofile", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        details: this.state
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
        this.props.history.push('/profile');
      } else {
        // handle errors
      }
    });

  }

  // React function that is called when the page load.
  componentDidMount() {

    fetch("/api/userinfo",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {

      console.log(data)
      var user = data.user;

      this.setState({
        isLoaded: true,
        fullName: (user.name ? user.name : ''),
        phoneNumber: (user.phone ? user.phone : ''),
        title: (user.title ? user.title : ''),
        state: (user.state ? user.state : ''),
        city: (user.city ? user.city : ''),
        bio: (user.bio ? user.bio : '')
      })

      appendScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
      appendScript('https://cdn.jsdelivr.net/jquery.dirtyforms/2.0.0/jquery.dirtyforms.min.js');
      appendScript('https://cdn.jsdelivr.net/gh/duckevinwu/external-js@0.2/FormAnimation.min.js');

		});

  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Preloader/>
      );
    } else {
      return (
        <div>
          <Navbar/>
          <div className="centered">
            <img src="https://i.imgur.com/xnPtYXg.png" className="form-logo" alt="cc-logo"></img>
            <form className="submit-form" id="edit-form" onSubmit={this.submitChanges}>

              <div className="input-block">
                 <label htmlFor="q1" className="sb-label sb-name">What's your full name?</label>
                 <input type="text" id="q1" className="text-question sb-form-q" placeholder="John Doe"
                  value={this.state.fullName} onChange={this.handleFullNameChange} required
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q2" className="sb-label sb-name">What's your phone number?</label>
                 <input type="tel" id="q2" className="text-question sb-form-q" placeholder="1234567890"
                  value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} required
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q3" className="sb-label sb-name">What's your title?</label>
                 <input type="text" id="q3" className="text-question sb-form-q" placeholder="Job, education, etc"
                  value={this.state.title} onChange={this.handleTitleChange}
                 />
              </div>

              <div className="input-block">
                 <label htmlFor="q4" className="sb-label sb-name">What state do you live in?</label>
                 <select form="edit-form" value={this.state.state} onChange={this.handleStateChange}
                  className="text-question sb-form-q" required
                 >
                    <option value=""></option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
              </div>

              <div className="input-block">
                 <label htmlFor="q5" className="sb-label sb-name">What city do you live in?</label>
                 <input type="text" id="q5" className="text-question sb-form-q" placeholder=""
                  value={this.state.city} onChange={this.handleCityChange} required
                 />
              </div>

              <div className="input-block large-block">
                 <label htmlFor="q6" className="sb-label sb-idea">Give yourself a brief bio!</label>
                 <textarea id="q6" className="text-question sb-form-q textarea-q" value={this.state.bio} onChange={this.handleBioChange}></textarea>
              </div>

              <div className="input-block">
                 <button type="submit" className="submit-button sb-form-q">Submit</button>
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

export default withRouter(EditProfile);
