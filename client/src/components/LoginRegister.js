import React from 'react';
import '../style/LoginRegister.css';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
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
      <div className="login-page">
      <Navbar/>
      <div className="login-wrap">
  	   <div className="login-html">
  		   <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/>
         <label htmlFor="tab-1" className="tab tab-title">Login</label>
  		   <input id="tab-2" type="radio" name="tab" className="sign-up"/>
         <label htmlFor="tab-2" className="tab tab-title">Sign up</label>
         <div className="login-form">
          <Login/>
          <Register/>
         </div>
       </div>
      </div>
      </div>
    );

  }
}
