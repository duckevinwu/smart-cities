import React from 'react';
import '../style/Preloader.css';


export default class Preloader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="preloader-page">
        <div className="pre-loader">
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
        </div>
        <div className="load-text" id="turbo">
          If this takes too long, click <a href="" className="reload-link">here</a> to speed it up :)
        </div>
      </div>
    );
  }

}
