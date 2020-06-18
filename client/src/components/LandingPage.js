import React from 'react';
import '../style/LandingPage.css';
import { appendScript } from '../js/AppendScript.js';
// import '../js/typing.js';
//import PageNavbar from './PageNavbar';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  // React function that is called when the page load.
  componentDidMount() {
    //appendScript("./Typing.js");
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js");
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js");
    appendScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
  }

  render() {
    return (
      <div className="page">
      <div>
         <div className="content">
            <div id="large-header" className="large-header">
               <canvas id="demo-canvas"></canvas>
                <img className="logo" src="https://i.imgur.com/VEZS91f.png"></img>
                <div className="main-title">
                  <font className="collective-font">Collective</font><font className="cause-font">Cause</font>
                </div>
                <div id="text"></div>
                <div className="buttonWrap">
                  <button type="button" className="enter"> Enter </button>
                </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}
