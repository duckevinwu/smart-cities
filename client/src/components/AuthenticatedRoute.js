import React from 'react';
import { withRouter } from 'react-router-dom';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

class AuthenticatedRoute extends React.Component {
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
      var isAuthenticated = data.authenticated
      if (isAuthenticated === 'true') {
        // go here if user is already authenticated (logged in)
        this.props.history.push(this.props.success);
      } else {
        // render this component if user is not authenticated (logged in)
        var loginPage = this.props.fail;
        this.setState({
          pageData: loginPage
        })
      }
		});
  }

  render() {
    return this.state.pageData;
  }
}

export default withRouter(AuthenticatedRoute);
