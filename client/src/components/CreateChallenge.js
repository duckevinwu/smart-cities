import React from 'react';
//import '../style/Dashboard.css';
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
      brief: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTaglineChange = this.handleTaglineChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleRewardChange = this.handleRewardChange.bind(this);
    this.handleBriefChange = this.handleBriefChange.bind(this);
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
    var start = new Date(e.target.value);
    var startStr = start.getTime().toString();
    this.setState({
      startDate: e.target.value,
      startDateString: startStr
    })
  }

  handleEndDateChange(e) {
    this.setState({
      endDate: e.target.value
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
        name: this.state.name,
        tagline: this.state.tagline
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
      } else {
        // handle errors
      }
    });

  }

  // React function that is called when the page load.
  componentDidMount() {

  }

  render() {
    return (
      <form onSubmit={this.submitChallenge}>
        <div>
          <h1>Create Challenge</h1>
          <p>Please fill in this form to create a challenge</p>

          <label><b>Name</b></label>
          <br/>
          <input type="text" placeholder="Challenge name" value={this.state.name} onChange={this.handleNameChange} required />

          <br/>
          <br/>

          <label><b>Tagline</b></label>
          <br/>
          <textarea value={this.state.tagline} onChange={this.handleTaglineChange}></textarea>

          <br/>

          <label><b>Start date</b></label>
          <br/>
          <input type="month" value={this.state.startDate} onChange={this.handleStartDateChange}/>

          <br/>

          <label><b>End date</b></label>
          <br/>
          <input type="month" value={this.state.endDate} onChange={this.handleEndDateChange}/>

          <br/>

          <label><b>Reward</b></label>
          <br/>
          <input type="text" placeholder="Reward" value={this.state.reward} onChange={this.handleRewardChange} />

          <br/>

          <label><b>Category</b></label>
          <br/>

          <br/>

          <label><b>Brief</b></label>
          <br/>
          <textarea value={this.state.brief} onChange={this.handleBriefChange}></textarea>

          <br/>

          <button type="submit">Create Challenge</button>
        </div>
      </form>
    );
  }
}
