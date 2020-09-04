import React from 'react';
import '../style/Fellows.css';
import Navbar from './Navbar';

export default class Fellows extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="fellow-page">
      <Navbar/>
      <div className="main">
        <h1 className="fellow-title"> What's a Cause <font className="cc-underline">Fellow</font>? </h1>

      <div className="fellow-text">
        If you <font className="goldText">solve</font> one or more of our challenges, you will become a Cause Fellow. Cause Fellows are visionary <font className="goldText">innovators</font> who have a proven ability to solve complex, systemic problems. This is not only a distinction for your resume, but also a testament to your drive, ambition, and problem-solving abilities.
        <br/>
        <br/>
        As a Fellow, you will gain access to <font className="goldText">all</font> of the following privileges:
      </div>

        <main className="container-fellow">
        <section className="card-fellow">
                  <img src="https://i.imgur.com/tvUOPCf.jpg" alt="fellow1"/>
                  <div>
                      <h3>Meet other Fellows who have connected the dots to solve one of our challenges.</h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/yjO8t0O.jpg" alt="fellow2"/>
                  <div>
                      <h3>We, along with our community partners, will help your solution gain media exposure (if you want) to take it to the next level.</h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/Xnq0K8v.jpg" alt="fellow3"/>
                  <div>
                      <h3> Gain lasting connections with our governmental, corporate, and nonprofit partners. </h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/7d8lNVy.jpg" alt="fellow4"/>
                  <div className="long-card">
                      <h3>And, finally, don’t forget that you solved a real-world problem. That’s not something that anyone can claim, and you should be very proud. We’re here to celebrate your success and support you in your future ambitions. </h3>
                  </div>
              </section>


        </main>
      </div>
      </div>
    );
  }


}
