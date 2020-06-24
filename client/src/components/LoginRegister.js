import React from 'react';
//import '../style/LoginRegister.css';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class Submission extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
    }

  }


  // React function that is called when the page load.
  componentDidMount() {

  }

  render() {
    return (
      <div className="login-wrap">
  	   <div className="login-html">
  		   <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/>
         <label htmlFor="tab-1" className="tab">Login</label>
  		   <input id="tab-2" type="radio" name="tab" className="sign-up"/>
         <label htmlFor="tab-2" className="tab">Sign up</label>
       </div>
      </div>
    );

  }
}
