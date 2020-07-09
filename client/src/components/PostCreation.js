import React from 'react';
import '../style/PostSubmission.css';

export default class PostCreation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="ps-wrapper">
        <h1 className="thank-you-text">
          Success! Your challenge has been created.
        </h1>
        <br/>
        <a href="/dashboard" className="back-profile">Back to Dashboard</a>
      </div>
    );
  }

}
