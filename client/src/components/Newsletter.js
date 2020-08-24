import React from 'react';
import '../style/Newsletter.css';

export default class Newsletter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="new-landing-page">
        <section className="nl-page newsletter-section">
        <a href="/"><img className="logoLetters" src="https://i.imgur.com/sFUkpIV.png"></img></a>
        <div className="title">
          <span className="title-text">Just <font className="goldText">Cause</font>
            <img className="logo" src="https://i.imgur.com/VEZS91f.png"></img>
            <span className="title-2"> <b>Stay updated, become smarter</b> </span>
          </span>
        <span className="title-subtext"> That's right, we have a <font className="you">newsletter</font> too. You'll get updates when we post new challenges. Plus —you'll get a fun Sunday email about new and emerging smart city technologies. It's free, entertaining, and informative —what's not to love?


            </span>
        </div>

        <div className="email-wrap">
          <div className="nl-left">
            <input type="text" id="name" className="input-email" required />
            <label htmlFor="name" className="nl-label">Your email</label>
          </div>
          <div className="nl-right"><button type="submit" className="nl-submit">Try it out</button></div>
        </div>
        </section>
      </div>
    )
  }
}
