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
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/TypingAnimation.min.js");
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
        </div>
    );
  }
}

export default withRouter(LandingPage);
