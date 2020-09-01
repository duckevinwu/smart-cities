import React from 'react';
import Navbar from './Navbar';
import '../style/PostSubmission.css';

export default class PostNewsletterSignup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="post-submission-page">
        <Navbar/>
        <div className="ps-wrapper">

          <h1 className="thank-you-text">
            Success! You just joined an awesome newsletter.
          </h1>
          <br/>
          <a href="/" className="back-profile">Back to Home</a>
        </div>
      </div>
    );
  }

}
