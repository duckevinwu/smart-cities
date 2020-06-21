import React from 'react';


export default class LoggedInRoute extends React.Component {
  constructor(props) {
    super(props);

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
        // render this component if user is an admin
        var successPage = this.props.success;
        this.setState({
          pageData: successPage
        })
      } else {
        // go here if user is not an admin
        // this.props.history.push(this.props.fail);
        var failPage = this.props.fail;
        this.setState({
          pageData: failPage
        })
      }
		});
  }

  render() {
    return this.state.pageData;
  }
}
