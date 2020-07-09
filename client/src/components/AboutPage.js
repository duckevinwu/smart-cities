import React from 'react';
import '../style/AboutPage.css';
import { appendScript } from '../js/AppendScript.js'
import Navbar from './Navbar';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
    appendScript('https://unpkg.com/aos@next/dist/aos.js');
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/AosInit.js");
    appendScript("https://cdn.jsdelivr.net/gh/duckevinwu/external-js/UpButton.min.js");
  }

  render() {
    return(
      <div>
      <Navbar/>
      <header className="main-header">
        <div className="bg-image"></div>
        <h1><span>Learn <span className="border">About</span></span> <span className="smart-cities">Smart Cities</span></h1>
        <p> How will smart city innovation change your life?</p>
    </header>
    <main className="about-container">
        <section className="about-card">
            <img src="https://i.imgur.com/K1AJpMJ.jpg" alt="" className="about-img"/>
            <div>
                <h3>The ultimate goal of smart cities is to improve the quality of life for city residents.</h3>

            </div>
        </section>
        <section className="about-card" data-aos="fade-up">
            <img src="https://i.imgur.com/WTzhYQq.png" alt="" className="about-img"/>
            <div>
                <h3>...It can do so in many different ways.</h3>
            </div>
        </section>

        <section className="about-card" data-aos="fade-right">
            <img src="https://i.imgur.com/mUsWqaq.png" alt="" className="about-img"/>
            <div>
                <h3>Here's what that means for you.</h3>
            </div>
        </section>
        <section className="about-card" data-aos="fade-left">
            <img src="https://i.imgur.com/pEDo18l.jpg" alt="" className="about-img"/>
            <div>
                <h3>The movement is already starting...</h3>
              <br/>
                <p className="about-text">NYC has deployed LinkNYC, which is a first-of-its-kind communications network that is replacing New York City pay phones with state-of-the-art kiosks called Links. Each Link is equipped with free services like high-speed Wi-Fi, phone calls, a tablet for maps and city services, and device charging for anyone living in or visiting New York City to enjoy.</p>
            </div>
        </section>
        <section className="about-card" data-aos="fade-down">
            <img src="https://i.imgur.com/zM19cOB.jpg" alt="" className="about-img"/>
            <div>
                <h3>Seoul's Clean Cube</h3>
              <br/>
                <p className="about-text">Provides hourly reports to track collection efficiency, route optimization for waste collection, and real-time monitoring with Seoul's Clean City Network.</p>
            </div>
        </section>

      <section className="about-card" data-aos="fade-down">
            <img src="https://i.imgur.com/L1poivF.jpg" alt="" className="about-img"/>
            <div>
                <h3>Denver's Gunshot Detection</h3>
              <br/>
                <p className="about-text">Identifies where and when a gunshot is fired with precise accuracy so that police can repond faster. </p>
            </div>
        </section>

      <section className="about-card" data-aos="fade-down">
            <img src="https://i.imgur.com/qdQeqlE.jpg" alt="" className="about-img"/>
            <div>
                <h3>Pittsburgh's Smart Traffic Lights</h3>
              <br/>
                <p className="about-text">Uses real-time traffic volume to determine whether lights should turn green, yellow, or red. </p>
            </div>
        </section>

      <section className="about-card" data-aos="fade-down">
            <img src="https://i.imgur.com/ze5BsPL.jpg" alt="" className="about-img"/>
            <div>
                <h3>Amsterdam's Bicycle Energy Harvesting</h3>
              <br/>
                <p className="about-text">Dutch designers Guillaume Roukhomovsky and Blaž Verhnjak created S-Park, a bike rack system that can use kinetic energy from cycling to charge batteries. </p>
            </div>
        </section>


      <section className="about-card" data-aos="fade-down">
            <img src="https://i.imgur.com/y42FBcH.jpg" alt="" className="about-img"/>
            <div>
                <h3>...so what will the City of Brotherly Love do?</h3>
              <br/>
              <br/>
              <br/>
                <p className="about-text">You can determine the answer.</p>
              <br/>
              <br/>
              <br/>
              <br/>
              <a type="button" href="/challengecenter" className="about-enter"> Enter Challenge Center</a>
            </div>
        </section>

      </main>
      <a id="up-button"></a>
      </div>
    );
  }
}
