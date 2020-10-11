import React from 'react';
import DOMPurify from 'dompurify';
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class Submission extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isLoggedIn: false,
      userId: "",
      details: ""
    }

  }


  // React function that is called when the page load.
  componentDidMount() {
    fetch("/auth/isAuthenticated",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      var isAuthenticated = data.authenticated
      var id = data.userId
      if (isAuthenticated === 'true') {
        this.setState({
          isLoggedIn: true,
          userId: id,
          details: this.props.details
        });
      }
		});
  }

  render() {
    if (this.state.isLoggedIn) {

      var submitButton = (
        <a href={"/submitidea/" + this.props.challengeId}><button className="submitbutton">Submit Idea</button></a>
      )

      var date = new Date();

      if (date.getTime() < this.props.start) {
        submitButton = <p className="whiteText">This challenge has not opened yet.</p>
      } else if (date.getTime() > this.props.end) {
        submitButton = <p className="whiteText">This challenge has closed.</p>
      }

      return (
        <>
          <div className="submitbuttonwrapper">
            {submitButton}
          </div>
          <section className="cd-submission">
             <h3 className="submission-title">Submission Details</h3>
             <div className="section-content ql-editor"
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.details, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'] })}}>
             </div>
          </section>
        </>
      );
    } else {
      return (
        <div className="login-text">
          <a href={"/login?redirect=" + this.props.location.pathname} className="login-link">Login</a> to submit
        </div>
      );
    }
  }
}

export default withRouter(Submission);
