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
        <h1 className="fellow-title"> What's a Collective Cause <font className="cc-underline">Fellow</font>? </h1>

      <div className="fellow-text">
        Anyone who has <font className="goldText">solved</font> one or more of our challenges gains the title of a Collective Cause Fellow. By becoming a Fellow, you will be a part of a growing community of distinguished <font className="goldText">innovators</font>.
        <br/>
        <br/>
        As a Fellow, you will gain access to <font className="goldText">all</font> of the following privileges:
      </div>

        <main className="container-fellow">
        <section className="card-fellow">
                  <img src="https://i.imgur.com/tvUOPCf.jpg" alt=""/>
                  <div>
                      <h3>Meet other Fellows who have connected the dots to solve a smart city challenge.</h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/yjO8t0O.jpg" alt=""/>
                  <div>
                      <h3>We, along with our partners, will help your solution gain media exposure to take it to the next level. </h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/Xnq0K8v.jpg" alt=""/>
                  <div>
                      <h3> Gain lasting friendships and business partnerships with our corporate, governmental, and nonprofit partners. </h3>
                  </div>
              </section>

          <section className="card-fellow">
                  <img src="https://i.imgur.com/7d8lNVy.jpg" alt=""/>
                  <div>
                      <h3> And, finally, don't forget the fact that you created a city-wide innovation. You should be very proud.
                        <br/>
                        <br/>
                        This Fellowship title is an homage to your success.</h3>
                  </div>
              </section>


        </main>
      </div>
      </div>
    );
  }


}
