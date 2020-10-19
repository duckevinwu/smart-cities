import React from 'react';
import '../style/LandingPageNew.css';
import { appendScript } from '../js/AppendScript.js';

export default class LandingPageNew extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.joinSlack = this.joinSlack.bind(this);
  }

  joinSlack() {
    window.open('https://join.slack.com/t/collective-cause/shared_invite/zt-hyx6mdv8-1HBnll1O3b7eiWn3QVamuQ')
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
            <li><a href="/challengecenter" className="landing-link">Challenge Center</a></li>
            <li><a href="/aboutus" className="landing-link">About us</a></li>
            <li><a href="/partnership" className="landing-link">Partner with us</a></li>
            <li className="slide"></li>
          </ul>
        </nav>

        <section className="landing-section landing-page">
        <img className="logoLetters" src="https://i.imgur.com/sFUkpIV.png" alt="logo-letters"></img>
        <a className="button-landing login-button-lp" href="/login">Login</a>
          <div className="title">
            <div className="title-text-wrapper">
              <div className="title-new-text collective-text">Collective</div>
              <div className="title-new-text cause-text">
                <img className="logo-new-v2" src="https://i.imgur.com/VEZS91f.png" alt="skyline"></img>
                <font className="goldText">Cause</font>
              </div>
            </div>
            <span className="title-subtext">Innovate for good. Earn prizes. <font className="you">Impact.</font></span>
          </div>
        </section>

        <section id="how-section">
          <div className="">
            <div className="intro-title">
              Open Innovation for collective <font className="cc-underline">good</font>
            </div>
            <div className="intro-text">
              "You can't change the world if you're an ordinary person" is the phrase we strive to defy. If you want to join a community of everyday innovators who solve societal issues, you're in the right place. We post easily-understandable innovation challenges that anyone (yes, you) can tackle. You can even earn cash prizes (among other rewards) while you’re at it. Start using our platform in three simple steps:
            </div>
            <div className="arrow down"></div>
          </div>

          <div className="subsection">
            <h1 className="browse"> Create an  <font className="cc-underline-blue"><b>account</b></font></h1>

          <div className="browse-text">
            Our site is <font className="blue-text bt">all</font> about our user community. By creating an account, you'll join our <font className="blue-text bt">diverse</font> community of innovators who are making a difference in the world, and you'll have the ability to <font className="blue-text bt">submit</font> solutions to our challenges. Creating an account is absolutely <font className="blue-text bt">free</font> and takes about 30 seconds, so what are you waiting for?
          </div>
          <div className="button-position">
          <a className="button-landing blue-variation" href="/login"> Create an account</a>
          </div>
          </div>

          <div className="subsection">
            <div className="browse"> Browse the <br/><font className="cc-underline"><b>Challenge Center</b></font></div>

          <div className="browse-text">
            We post diverse innovation challenges that can shape the <font className="goldText bt">future</font> of cities, technology, corporations, and more. By solving one of our challenges, you can <font className="goldText bt">scale</font> your big idea, <font className="goldText bt">become</font> a Cause Fellow, and earn large <font className="goldText bt">cash</font> prizes. And here’s the kicker: Anyone can solve our challenges. All you need is your brain, a healthy sense of creativity, and a desire to do some good in this world.
        </div>
          <div className="button-position">
          <a className="button-landing" href="/challengecenter"> Enter Challenge Center</a>
            <a className="button-landing" href="/fellows"> About our Fellowship</a>
          </div>
          </div>

          <div className="subsection">
            <h1 className="browse"> Submit your <font className="cc-underline-green"><b>solution</b></font></h1>

          <div className="browse-text padding-bottom">
            When you expand the details of one of our challenges, we give you <font className="green-text bt">all</font> the information you need to submit your innovative solution. If you think we can do a better job (or just feel like saying hi) just <font className="green-text bt">reach out</font> to us at team@collectivecause.org —we'll <font className="green-text bt">always</font> respond.
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
                <i className="fa fa-lightbulb-o goldText bt"></i>
                <h2> <b>Earn</b> </h2>
                <p>
                  We’re here to turn your ideas into tangible value. That’s why you’ll earn a cash reward every time you solve one of our challenges.
                </p>
              </div>
            </div>
            <div className="why-box">
              <div>
                <i className="fa fa-users blue-text bt"></i>
                <h2> <b>Impact</b> </h2>
                <p>
                  If you want to make a difference in the world through your ideas, you’re in the right place. Our challenges are supported by established organizations, such as the Philadelphia Office of Innovation and Technology, and substantiated by research and evidence. By solving these challenges, you’ll make a real difference in communities around the world.
                </p>
              </div>
            </div>

            <div className="why-box">
              <div>
                <i className="fa fa-laptop green-text bt"></i>
                <h2><b>Learn</b></h2>
                <p>
                You won’t leave our site without learning a thing or two about social issues and potential areas of innovation. Our challenges are chock-full of amazing, easily-digestible information that will leave you wanting more.
                </p>
              </div>
            </div>

            <div className="why-box">
              <div>
                <i className="fa fa-rocket red-text"></i>
                <h2> <b>Beyond</b> </h2>
                <p>
                  If you win one of our challenges and have bigger aspirations, such as applying your idea to more locations or users, we’re here to support you. Whether that’s marketing your idea more, finding relevant partnerships, or even attracting investors, we’ll be by your side every step of the way.
                </p>
              </div>
            </div>
          </div>
         </div>

         <section className="community-section">
            <div className="card-wide">
               <div className="community-row">
                 <img src="https://i.imgur.com/QEzapp1.jpg" className="card-image-3" alt="slack-logo"/>
                 <div className="community-column">
                   <div className="card-title-wide">Join our <font className="cc-underline-green"><b>community</b></font></div>
                   <div className="description-wide">
                     To foster collaboration and communication, we created a Slack group where you can find partners to tackle our challenges, ask questions about our challenges, and message the Collective Cause team directly. Once you join, you'll see instructions on how to use this Slack group effectively. We hope that this group can incite creativity and inspire you in your journey to solve open innovation challenges.
                   </div>
                   <div className="button-join-position">
                     <button type="button" className="button-join" onClick={this.joinSlack}> Join our Slack </button>
                   </div>
                 </div>
               </div>
             </div>
         </section>


        <section className="who-section landing-page">
          <div className="urban-image"></div>
          <h1 className="who-title"> <font className="blue-text bt">Who</font> can use this <font className="cc-underline-blue">platform?</font></h1>
          <div className="who-body">
            This is an open innovation platform, so we invite <font className="blue-text bt">anyone</font> to solve our challenges. Whether you're a student, professor, community organizer, corporate worker, entrepreneur, freelancer, etc., we welcome <font className="blue-text bt">you</font> with open arms. The more the merrier, so feel free to apply with your friends, class, school group, professor, company/organization, or <font className="blue-text bt">anyone</font> else. That said, <font className="blue-text bt">some</font> of our challenges might have some eligibility restrictions, so make sure you check those out on each challenge's detail page. Our challenges are designed to be <font className="blue-text bt">easily understandable</font>, <font className="blue-text bt">informative</font>, and <font className="blue-text bt">entertaining</font>. So get out there —we can't wait to see your ideas.
          </div>
        </section>
       </div>
    );
  }

}
