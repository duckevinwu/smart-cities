import React from 'react';
import '../style/PostSubmission.css';

export default class PostSubmission extends React.Component {

  constructor(props) {
      super(props);

      this.state = {

      }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="ps-wrapper">
        <h1 className="thank-you-text"> Thank you for contributing to your smart city.
          Your submission has been received and our team looks forward to reviewing it!
          <br/>
          <br/>
          You should expect a response from us shortly after the closing date of the challenge.
          Should you have any questions or comments in the meantime, please feel free to reach out to us at team@collectivecause.org.
          <br/>
          <br/>
          Thanks, again, for making a difference in your city.
        </h1>
        <br/>
        <a href="/profile" className="back-profile"> Back to Profile</a>
      </div>
    );
  }

}
