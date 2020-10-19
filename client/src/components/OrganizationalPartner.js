import React from 'react';
import Navbar from './Navbar';
import '../style/Feedback.css';

export default class OrganizationalPartner extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <Navbar/>
        <h1 className="suggest-title">Become our <font className="cc-underline">Partner</font></h1>

        <div className="suggest-text">
          We're currently accepting university-based partners! If you represent a university-based organization and want to partner with Collective Cause, please fill out the Google Form below. Our team will then be in touch for next steps, where we'll define a mutually beneficial partnership.
          <br/>
          <br/>
          Some benefits of partnering with Collective Cause include, but are not limited to:
          <br/>
          <ol>
            <li>Broaden your organization's audience, as we can feature your organization on our website</li>
            <li>Publicize events or other written material through our website</li>
            <li>Publicize career opportunities from your organization on our site</li>
          </ol>
        </div>


        <div className="iframe-container">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdXYuQFYgXoCMDOR4StQUmNqQ3Awz3R3LPRtlw0SzkrsNk-tg/viewform?embedded=true" width="100%" scrolling="no" frameBorder="0" marginHeight="0" marginWidth="0" className="feedback-form-iframe">Loading…</iframe>
        </div>
      </div>
    )
  }

}
