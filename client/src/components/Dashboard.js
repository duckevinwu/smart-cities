import React from 'react';
import MyChallenges from './MyChallenges';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  // React function that is called when the page load.
  componentDidMount() {
  }

  render() {
    return (
      <MyChallenges />
    );
  }
}
