import React from 'react';
import Register from './Register'
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class RegisterWrapper extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      pageData: ""
    }
  }


  // React function that is called when the page load.
  componentDidMount() {
    fetch("/auth/isAuthenticated",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      var isAuthenticated = data.authenticated
      if (isAuthenticated === 'true') {
        this.props.history.push('/profile');
      } else {
        var registerPage = <Register/>;
        this.setState({
          pageData: registerPage
        })
      }
		});
  }

  render() {
    return this.state.pageData;
  }
}

export default withRouter(RegisterWrapper);
