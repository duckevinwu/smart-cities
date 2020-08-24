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
            <li><a href="/aboutus" className="landing-link">About us</a></li>
            <li><a href="/challengecenter" className="landing-link">Challenge Center</a></li>
            <li><a href="/about" className="landing-link">About Smart Cities</a></li>
            <li><a href="/newsletter" className="landing-link">Just Cause</a></li>
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
            <span className="title-subtext"> We post urban challenges for <font className="you">you to solve.</font></span>
          </div>
        </section>

        <section id="how-section">
          <div className="subsection">
            <div className="browse"> Browse the <br/><font className="cc-underline"><b>Challenge Center</b></font></div>

          <div className="browse-text">
            <font className="goldText">Welcome</font> to Collective Cause! Here's how this works: We post diverse urban challenges that can shape the <font className="goldText">future</font> of cities. By solving our challenges, you can <font className="goldText">launch</font> your big idea in cities across the nation, <font className="goldText">learn</font> a ton of cool information about social issues, <font className="goldText">become</font> a Collective Cause Fellow, and earn large <font className="goldText">cash</font> prizes. Anyone can solve our challenges. All you need is your brain, a healthy sense of creativity, and a desire to do some good in this world.
        </div>
          <div className="button-position">
          <a className="button-landing" href="/challengecenter"> Enter Challenge Center</a>
            <a className="button-landing" href="/fellows"> About our Fellowship</a>
          </div>
          </div>

          <div className="subsection">
            <h1 className="browse"> Create an  <font className="cc-underline-blue"><b>account</b></font></h1>

          <div className="browse-text">
            Our site is <font className="blue-text">all</font> about our user community. By creating an account, you'll join our <font className="blue-text">diverse</font> community of innovators who are making a difference in the world, and you'll have the ability to <font className="blue-text">submit</font> solutions to our challenges. Creating an account is absolutely <font className="blue-text">free</font> and takes about 30 seconds, so what are you waiting for?
        </div>
          <div className="button-position">
          <a className="button-landing blue-variation" href="/login"> Create an account</a>
          </div>
          </div>

          <div className="subsection">
            <h1 className="browse"> Submit your <font className="cc-underline-green"><b>solution</b></font></h1>

          <div className="browse-text padding-bottom">
            When you expand the details of one of our challenges, we give you <font className="green-text">all</font> the information you need to submit your innovative solution. If you think we can do a better job (or just feel like saying hi) just <font className="green-text">reach out</font> to us at team@collectivecause.org —we'll <font className="green-text">always</font> respond.
        </div>
            <div className="button-position">
            <a className="button-landing green-variation" href="mailto:team@collectivecause.org"> Contact us</a>
          </div>
          </div>
        </section>


        <div id="why-section" className="why-section">
          <h1 className="why-title"> Why use this platform? </h1>
          <div className="why-container">
            <div className="why-box">
              <div>
                <i className="fa fa-lightbulb-o goldText"></i>
                <h2> <b>Earn</b> </h2>
                <p>
                  We're here to turn your ideas into tangible value. That's why each of our challenges has a substantial cash reward.
                </p>
              </div>
            </div>
            <div className="why-box">
              <div>
                <i className="fa fa-users blue-text"></i>
                <h2> <b>Impact</b> </h2>
                <p>
                  Ever dream of changing the world without any means of doing so? Now you can. By solving our challenges, you will impact the lives of everyday individuals and drive large-scale change in communities around the world.
                </p>
              </div>
            </div>

            <div className="why-box">
              <div>
                <i className="fa fa-laptop green-text"></i>
                <h2><b>Learn</b></h2>
                <p>
                You won't leave our site without learning a thing or two about social issues and potential areas of innovation. Our challenges are chock-full of amazing information that will leave you wanting more.
                </p>
              </div>
            </div>

            <div className="why-box">
              <div>
                <i className="fa fa-rocket red-text"></i>
                <h2> <b>Beyond</b> </h2>
                <p>
                  We know that your ideas might have bigger aspirations beyond winning our challenges. So, if you win one of our challenges, we'll be here to support your aspirations —whether that's marketing your idea more or even helping you turn your idea into your own company.
                </p>
              </div>
            </div>
          </div>
         </div>


        <section className="who-section landing-page">
          <h1 className="who-title"> <font className="blue-text">Who</font> can use this <font className="cc-underline-blue">platform?</font></h1>
          <div className="who-body">
            This is an open innovation platform, so we invite <font className="blue-text">anyone</font> to solve our challenges. Whether you're a student, professor, community organizer, corporate worker, entrepreneur, freelancer, etc., we welcome <font className="blue-text">you</font> with open arms. The more the merrier, so feel free to apply with a group, your company/organization, your uncle Joe, your college roommate, or <font className="blue-text">anyone</font> else. That said, <font className="blue-text">some</font> of our challenges might have some eligibility restrictions, so make sure you check those out on each challenge's detail page. Our challenges are designed to be <font className="blue-text">easily</font> digestable, <font className="blue-text">informative</font>, and <font className="blue-text">entertaining</font>. So get out there —we can't wait to see your ideas.
          </div>
        </section>
       </div>
    );
  }

}
