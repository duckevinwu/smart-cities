import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/LandingPage.css';
import { appendScript } from '../js/AppendScript.js';
import Navbar from './Navbar';
// import '../js/typing.js';
//import PageNavbar from './PageNavbar';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.enterSite = this.enterSite.bind(this);
  }


  // React function that is called when the page load.
  componentDidMount() {
    //appendScript("./Typing.js");
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js");
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/NodesAnimation.min.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/TypingAnimation.min.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/UpButton.min.js");
  }

  enterSite() {
    this.props.history.push('/challengecenter');
  }

  render() {
    return (
      <div className="page">
      <Navbar/>
      <div>
         <div className="content">
            <div id="large-header" className="large-header">
               <canvas id="demo-canvas"></canvas>
                <img className="logo" src="https://i.imgur.com/VEZS91f.png" alt="philly skyline"></img>
                <div className="main-title">
                  <font className="collective-font">Collective</font><font className="cause-font">Cause</font>
                </div>
                <div id="text"></div>
                <div className="buttonWrap">
                  <button type="button" className="enter" onClick={this.enterSite}> Enter </button>
                </div>
            </div>
          </div>
        </div>


        <div className="aboutUs lp-section">
          <div className="aboutUs-words">
            <h2 className="aboutUs-title"> A <font className="whiteText">smart</font> city uses <font className="whiteText">technology</font> and <font className="whiteText">innovation</font> to improve the <font className="goldText">quality of life</font> of its citizens. </h2>

            <div className="learn-buttonWrap">
            <a type="button" href="/about" className="learn-more">Learn about Smart Cities </a>
            </div>

            <h2 className="aboutUs-title"> Our mission is to enable <font className="goldText">anyone</font> to contribute to Philadelphia's smarter future. </h2>
          </div>
        </div>


        <section className="cardBody lp-section-bottom">
          <h2 className="how-title"> <font className="goldText">How</font> it works</h2>

        <div className="lp-grid">

          <div className="lp-card zoom">
            <div className="lp-upper">
              <div className="lp-card-title"> Browse <font className="whiteText">the Challenge Center</font>
              </div>
              <br/>
            <div className="lp-description">
            We find the most impactful and diverse challenges that could shape the future of Philadelphia.
            </div>
            </div>
          </div>

          <div className="lp-card zoom">
          <div className="lp-upper">
              <div className="lp-card-title">Choose<font className="whiteText"> your favorite</font></div>
              <br/>
            <div className="lp-description">
            Pick your favorite challenge, find some teammates, or tackle it solo!
            </div>
            </div>
          </div>

          <div className="lp-card zoom">
            <div className="lp-upper">
              <div className="lp-card-title">Submit <font className="whiteText">your solution</font></div>
            </div>
            <br/>
            <div className="lp-description">
            We have a seamless and intuitive submission form so that you can easily propose your solution.
            </div>
          </div>
          </div>
          </section>
          <a id="up-button"></a>
        </div>
    );
  }
}

export default withRouter(LandingPage);
