import React from 'react';
import Navbar from './Navbar';
import '../style/Partner.css';
import { appendScript } from '../js/AppendScript.js';

export default class CreationPartner extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');
  }

  render() {
    return (
      <div className="main">
        <Navbar/>
        <h1 className="suggest-title"><font className="cc-underline">Create</font> with us</h1>

        <div className="suggest-text">
          We can work with your organization to crowdsource a challenge on Collective Cause! We'll work together to ensure that your challenge benefits society as a whole as well as your company/organization. This is your opportunity to crowdsource innovative ideas for any challenge of your imagination. For a limited time, Collective Cause is offering this opportunity at no charge. We may even be willing to sponsor your challenge. Just fill out the Google Form below to get started.
          <br/>
          <br/>
          Need some inspiration? Check out these companies, organizations, and governments that have leveraged open innovation:
        </div>

        <br/>
        <br/>

        <div id="carouselExampleIndicators" class="carousel slide partner-examples" data-ride="carousel" data-interval="false">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://i.imgur.com/SNMr5d4.jpg" alt="First slide"/>
              <div class="carousel-caption caption-background">
                <h5 class="slide-title">The Netflix Prize</h5>
                <p class="slide-description">The $1MM Netflix Prize was an open innovation competition from 2006-2009 where participants were tasked to create the best algorithm to predict user ratings for films. </p>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://i.imgur.com/8rQC4A1.jpg" alt="Second slide"/>
              <div class="carousel-caption caption-background">
                <h5 class="slide-title">NYCx Climate Action Challenge</h5>
                <p class="slide-description">New York City's Climate Action Moonshot sought to answer one crucial quesiton facing all cities: How might we replace all gas-powered vehicles in NYC? The challenge had two "tracks": (1) Emerging technologies for fast charging and smart EVs and (2) Immediately commercializable EV charging technologies. </p>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://i.imgur.com/wWCCbtU.jpg" alt="Third slide"/>
              <div class="carousel-caption caption-background">
                <h5 class="slide-title">Department of Energy Solar Decathlon</h5>
                <p class="slide-description">
                  The U.S. Department of Energy Solar Decathlon is a collegiate competition, comprising 10 contests, that challenges student teams to design and build highly efficient and innovative buildings powered by renewable energy. The winners are those teams that best blend architectural design and engineering excellence with innovation, market potential, building efficiency, and smart energy production.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://i.imgur.com/jSUdZEj.jpg" alt="Fourth slide"/>
              <div class="carousel-caption caption-background">
                <h5 class="slide-title">Enel Open Innovability</h5>
                <p class="slide-description">
                  Enel is an Italian multinational energy company that has created its own open innovation platform —Open Innovability— to crowdsource innovative ideas related to the renewable energy industry.
                </p>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div className="iframe-container">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSesmeB7W1pqrhSmjywF_xRAvJPG3Lk8CN5WvMJFq8ANCj0g4g/viewform?embedded=true" width="100%" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" className="feedback-form-iframe">Loading…</iframe>
        </div>
      </div>
    )
  }

}
