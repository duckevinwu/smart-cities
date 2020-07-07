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
      </div>
    );
  }

}
