import React from 'react';
import '../style/LandingPageNew.css';
import { appendScript } from '../js/AppendScript.js';

export default class LandingPageNew extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/UpButton.min.js");
  }

  render() {
    return (
      <div className="new-landing-page">
        <nav className="landing-nav">
          <ul>
            <li><a href="#how-section" className="landing-link">How this works</a></li>
            <li><a href="#our-mission" className="landing-link">Our mission</a></li>
            <li><a href="/challengecenter" className="landing-link">Challenge Center</a></li>
            <li><a href="/about" className="landing-link">About Smart Cities</a></li>
            <li className="slide"></li>
          </ul>
        </nav>

        <section className="landing-section landing-page">
        <img className="logoLetters" src="https://i.imgur.com/sFUkpIV.png"></img>
        <a className="button-landing login-button-lp" href="/login">Login</a>
          <div className="title">
            <span className="title-text">Collective <font className="goldText">Cause</font>
              <img className="logo-new" src="https://i.imgur.com/VEZS91f.png"></img>
            </span>
            <span className="title-subtext"> We post smart city challenges for <font className="you">you to solve.</font></span>
          </div>
        </section>

        <section id="how-section" className="landing-section">
          <div className="subsection">
          <div className="browse"> Browse the <br/><font className="cc-underline">Challenge Center</font></div>

          <div className="browse-text">
          Our Challenge Center features diverse smart city challenges that can shape the future of Philadelphia. By solving challenges, you can <font className="goldText">earn</font> cash prizes, <font className="goldText">enable</font> your big idea in the City of Brotherly Love, and <font className="goldText">become</font> a Collective Cause Fellow.
        </div>
          <div className="button-position">
          <a className="button-landing" href="/challengecenter"> Enter Challenge Center</a>
            <a className="button-landing" href="/fellows"> About Fellows</a>
          </div>
          </div>

          <div className="subsection">
          <h1 className="browse"> Create an  <font className="cc-underline">account</font></h1>

          <div className="browse-text">
          In order to submit a solution to one of our challenges, you need to <font className="goldText">create</font> an account.
        </div>
          <div className="button-position">
          <a className="button-landing" href="/login"> Create an account</a>
          </div>
          </div>

          <div className="subsection">
          <h1 className="browse"> Submit your <font className="cc-underline">solution</font></h1>

          <div className="browse-text padding-bottom">
            We give you <font className="goldText">all</font> the tools you need to submit your innovative solution. If you have questions, just reach out to us (team@collectivecause.org).
        </div>
          </div>
        </section>

        <section id="our-mission" className="landing-section our-mission">

          <div className="mission"> Our <font className="cc-underline">Mission</font></div>

          <div className="mission-text">
            We srive to <font className="goldText">accelerate</font> <font className="goldText">open</font> smart city innovation in the City of Philadelphia.
          <br/>
            Founded in 2019 by students at the University of Pennsylvania, our mission is guided by 4 principles:
          </div>

          <h1 className="mission-subheadings"> <font className="cc-underline">Equity</font></h1>

          <div className="mission-subtext">
            All solutions that come out of this platform ought to impact Philadelphians equitably. This means that no solution should <font className="goldText">disproportionately</font> benefit nor harm Philadelphians on the basis of their geographic location, race, ethnicity, socioeconomic status, age, and any other defining characteristic.
          </div>

          <h1 className="mission-subheadings"> <font className="cc-underline">Inclusion</font></h1>

          <div className="mission-subtext">
            Open innovation cannot proceed without inclusive access to <font className="goldText">all</font>. As long as you have an internet connection and can access this website, we want to give you an <font className="goldText">equal chance</font> at succeeding and solving challenges. Thus, if you find that we are not giving you all the tools to tackle our challenges, please let us <font className="goldText">know</font> via email.
          </div>

          <h1 className="mission-subheadings"> <font className="cc-underline">Data privacy</font></h1>

          <div className="mission-subtext">
            Smart city innovation will necessarily involve information technology. For any solution that invovles information technology and, in particular, the data of <font className="goldText">private</font> citizens, we urge all of our solutions to properly handle people's data. This means that data ought to be handled <font className="goldText">knowingly</font> and <font className="goldText">securely</font>. In this modern age, private data is a paramount issue in cybersecurity, so all technological innovations should keep this in mind.
          </div>

          <h1 className="mission-subheadings"> <font className="cc-underline">Quality of Life</font></h1>

          <div className="mission-subtext padding-bottom">
            The foremost question behind any smart city innovation should be as follows: Am I improving the <font className="goldText">quality</font> of life for city residents, or not? This is the entire purpose of smart city innovation, and it is <font className="goldText">the</font> guiding principle that we follow to not only source new challenges, but also choose winners.
          </div>
        </section>
        <a id="up-button"></a>
        </div>

    );
  }

}
