import React from 'react';
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class IdeaForm extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      challengeId: "",
      content: ""
    }

    this.handleContentChange = this.handleContentChange.bind(this);
    this.submitIdea = this.submitIdea.bind(this);

  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
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
        content: this.state.content
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
    var challengeId = this.props.match.params.challengeid

    this.setState({
      challengeId: challengeId
    });

  }

  render() {
    return (
      <form onSubmit={this.submitIdea}>
        <div>
          <h1>Submit Idea</h1>
          <p>Please fill in this form to submit an idea</p>

          <br/>

          <label><b>Idea</b></label>
          <br/>
          <textarea value={this.state.content} onChange={this.handleContentChange}></textarea>

          <br/>

          <button type="submit">Submit idea</button>
        </div>
      </form>
    );

  }
}

export default withRouter(IdeaForm);
