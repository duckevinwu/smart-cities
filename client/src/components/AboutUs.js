import React from 'react';
import '../style/Newsletter.css';

export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="new-landing-page">

      <section className="au-section newsletter-section">
        <a href="/"><img className="logoLetters" src="https://i.imgur.com/sFUkpIV.png"></img></a>
          <div className="title">
          <div className="title-text-wrapper">
            <div className="title-new-text collective-text nl-title">
              <img className="logo-new-v2" src="https://i.imgur.com/VEZS91f.png"></img>
              About
            </div>
            <div className="title-new-text cause-text nl-title">
              <font className="goldText">Us</font>
            </div>
          </div>
            <span className="au-title-2"> <b>Your partners in urban innovation</b> </span>
        <span className="au-title-subtext">
          We're an <font className="you">open innovation</font> platform dedicated to urban challenges. We work with cities, corporations, universities, and nonprofits to find impactful open innovation challenges, and we post them in full detail for you. Our goal is simple: Enable anyone to solve urban innovation challenges and provide awesome incentives in the process.
          <br/> <br/>
          We're also a <font className="you">community</font>. When you register an account with us, you're joining a diverse community of urban innovators who genuinely care about our world.
          <br/> <br/>
          We want you to have an <font className="you">amazing</font> experience on this site, so if there's anything we can do to make it better, please don't be afraid to let us know at team@collectivecause.org.


              </span>
          </div>
        </section>

        <section id="our-mission" className="our-mission">
          <div className="mission"> Our <font className="cc-underline">Mission</font></div>

          <div className="mission-text">
            We srive to accelerate <font className="goldText">open</font> innovation so that anyone can <font className="goldText">impact</font> social causes, <font className="goldText">earn</font> well-deserved rewards, and join a diverse <font className="goldText">community</font> of innovators.
            Founded in 2018 by students at the University of Pennsylvania, our mission is guided by 5 principles:
          </div>

          <h1 className="mission-subheadings"> Equ<font className="cc-underline">ity</font></h1>

          <div className="mission-subtext">
            <font className="goldText">No</font> solution from this site should harm citizens on the basis of their geographic location, race, ethnicity, socioeconomic status, age, and any other defining characteristic. <font className="goldText">All</font> solutions will be judged <font className="goldText">fairly</font> without any biases.
            </div>

          <h1 className="mission-subheadings"> <font className="cc-underline">Inclu</font>sion</h1>

          <div className="mission-subtext">
            Open innovation cannot proceed without inclusive access to <font className="goldText">all</font>. As long as you have an internet connection and can access this website, we want to give you an <font className="goldText">equal chance</font> at succeeding and solving challenges. Thus, <font className="goldText">regardless</font> of your educational background, area of expertise, current occupation, hair color, or favorite animal, we <font className="goldText">believe</font> in your ability to solve these challenges. We also try to market our challenges to a broad and diverse audience of potential solvers. If you want to help us market to more individuals, please reach out to us.
          </div>

          <h1 className="mission-subheadings"> Quality of <font className="cc-underline">Life</font></h1>

          <div className="mission-subtext">
            The <font className="goldText">foremost</font> question behind any social innovation should be: Am I improving the <font className="goldText">quality</font> of life of those that I'm impacting, or not? This is <font className="goldText">the</font> guiding principle that we follow to not only source new challenges, but also choose winners.
          </div>

          <h1 className="mission-subheadings"> Collab<font className="cc-underline">oration</font></h1>

          <div className="mission-subtext padding-bottom">
            No social innovation can occur in a <font className="goldText">silo</font>. Thus, we highly encourage all of our solvers to <font className="goldText">work</font> with friends, <font className="goldText">engage</font> with community partners, seek <font className="goldText">advice</font> from experts, and approach important <font className="goldText">stakeholders</font> who can affect the implementation of your innovation. Social innovations are fundamentally a <font className="goldText">team</font> effort.
          </div>

        </section>
      </div>
    );
  }
}
