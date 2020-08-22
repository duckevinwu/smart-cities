import React from 'react';
import ViewIdeas from './ViewIdeas';
import ViewProposals from './ViewProposals';
import '../style/ViewSubmissions.css';
import { appendScript } from '../js/AppendScript.js';
import Navbar from './Navbar';
import Preloader from './Preloader';

export default class ViewSubmissions extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      isCorrectUser: false,
      isLoaded: false,
      challengeId: "",
      userId: "",
      name: "",
      color: ""
    }

  }


  // React function that is called when the page load.
  componentDidMount() {

    appendScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    appendScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');

    var challengeId = this.props.match.params.challengeid;

    this.setState({
      challengeId: challengeId
    });

    fetch("/api/challengeowner/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      if (data.status === 'success') {
        this.setState({
          isCorrectUser: true,
          name: data.name,
          color: data.color
        })
      }
      this.setState({
        isLoaded: true
      });
		});
  }

  render() {
    if (this.state.isLoaded) {
      if (this.state.isCorrectUser) {
        return (
          <div>
            <Navbar/>
            <div className="container py-5 cd-page">
              <div className="shadow mb-5 details-card">
                <div className="card-content">
                  <h1 className="vs-title">{this.state.name}</h1>
                </div>
                <br/>
                <ul id="myTab2" role="tablist" className="nav nav-tabs nav-pills with-arrow lined flex-column flex-sm-row text-center">
                  <li className="nav-item flex-sm-fill">
                    <a id="home2-tab" data-toggle="tab" href="#ideas" role="tab" aria-controls="ideas" aria-selected="true"
                        className="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 active">Ideas</a>
                  </li>
                  <li className="nav-item flex-sm-fill">
                    <a id="profile2-tab" data-toggle="tab" href="#proposals" role="tab" aria-controls="proposals"
                        aria-selected="false" className="nav-link text-uppercase font-weight-bold rounded-0">Proposals</a>
                  </li>
                </ul>
                <div id="myTab2Content" className="tab-content">
                  <div id="ideas" role="tabpanel" aria-labelledby="home2-tab" className="tab-pane fade px-4 py-5 vs-tab show active">
                    <ViewIdeas challengeId={this.state.challengeId} cName={this.state.name} color={this.state.color}/>
                  </div>
                  <div id="proposals" role="tabpanel" aria-labelledby="profile2-tab" className="tab-pane fade px-4 py-5 vs-tab">
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <p>Not authorized to view this page</p>
          </div>
        );
      }

    } else {
      return (<Preloader/>);
    }
  }
}
