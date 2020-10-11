import React from 'react';
import '../style/Feedback.css';

export default class Feedback extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <h1 className="suggest-title"> Tell us what challenges <font className="cc-underline">you</font> want to see!</h1>

        <div className="suggest-text">
          Our Feedback Guarantee: we will <b>always</b> take your feedback into consideration because our user base is our number one priority. So go ahead and suggest anything related to challenges here...your idea might just make an appearance on our Challenge Center in the near future.
        </div>


        <div className="iframe-container">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdZrHzl82vfbGdGH03o6-E_O8j0Rt0eB3e-Jcf_0GDVwbrEOw/viewform?embedded=true" width="100%" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" className="feedback-form-iframe">Loading…</iframe>
        </div>
      </div>
    )
  }

}
