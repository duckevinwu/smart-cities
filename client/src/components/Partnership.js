import React from 'react';
import Navbar from './Navbar';
import '../style/Feedback.css';

export default class Partnership extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <Navbar/>
        <h1 className="suggest-title"><font className="cc-underline">Partnership</font> Opportunities</h1>

        <div className="suggest-text">
          We currently have 2 partnership opportunities: Creation Partner or Organizational Partner. As a Creation Partner, you can craft a unique challenge to post on our Challenge Center. As an Organizational Partner, we can work together to maximize the reach and impact of our respective organizations. If none of these options relate to you, feel free to suggest your own!
        </div>

          <div className="pcard-container">
            <div className="pcard-box">
              <div className="pcard-box-content">
                <div className="pcard-top">
                  <i className="fa fa-plus-circle green-text bt"></i>
                  <h2> Creation <b>Partner</b> </h2>
                  <p>
                    Create your own challenge to post on Collective Cause! We'll help you draft it up and market it to as many people as possible. We only have one goal: Deliver a great solution to you.
                  </p>
                </div>
                <div className="pcard-bottom">
                  <a href="/creationpartner" type="button" class="button-partner">Learn More</a>
                </div>
              </div>
            </div>

            <div className="pcard-box">
              <div className="pcard-box-content">
                <div className="pcard-top">
                  <i className="fa fa-users purple-text bt"></i>
                  <h2> Organizational <b>Partner</b> </h2>
                  <p>
                    We are currently accepting university partners (e.g. student organizations, university-based centers, research institutions, etc.). We'll craft our partnership together to ensure that it's mutually beneficial.
                  </p>
                </div>
                <div className="pcard-bottom">
                  <a href="/organizationalpartner" type="button" class="button-partner">Learn More</a>
                </div>
              </div>
            </div>

            <div className="pcard-box">
              <div className="pcard-box-content">
                <div className="pcard-top">
                  <i className="fa fa-lightbulb-o goldText bt"></i>
                  <h2>Have another <b>idea?</b></h2>
                  <p>
                    We're open-minded, so please let us know if you have another partnership idea in mind.
                  </p>
                </div>
                <div className="pcard-bottom">
                  <a href="mailto:team@collectivecause.org" type="button" class="button-partner"> Get in touch</a>
                </div>
              </div>
            </div>
          </div>

      </div>
    )
  }

}
