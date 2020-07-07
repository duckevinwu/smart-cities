import React from 'react';
import '../style/Navbar.css';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
      isLoaded: false
		}

		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
    fetch("/auth/isAuthenticated",
		{
			method: "GET",
      headers: {
        'Cache-Control': 'no-cache'
      }
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data)
      var isAuthenticated = data.authenticated
      if (isAuthenticated === 'true') {
        this.setState({
          isLoggedIn: true
        });
      }

      this.setState({
        isLoaded: true
      })
		});
	}

	handleLogout() {
		fetch("/logout",
		{
			method: "GET"
		}).then(res => {
			if (res.status === 200) {
				this.props.history.push('/login');
				return;
			}
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {

		});
	}

	render() {
		if (this.state.isLoaded) {
      if (!this.state.isLoggedIn) {
        return (
          <label>
            <input type="checkbox" className="navWrapper"/>
            <div className="handler fa fa-list"></div>

            <div className="overlay"></div>
            <nav className="navLoggedOut">
              <img src="https://i.imgur.com/XoWNpJK.png" className="nav-logo" alt="cc-logo"/>
            <ul>
              <li className="nav-home-lo"><a className="whiteLink" href="/">Home</a></li>
              <li className="nav-challenge-center-lo"><a className="whiteLink" href="/challengecenter">Challenge Center</a></li>
              <li className="nav-login-lo"><a className="whiteLink" href="/login">Login/Register</a></li>
            </ul>
            </nav>
          </label>
        );
      } else {
        return (
          <label>
            <input type="checkbox" className="navWrapper"/>
            <div className="handler fa fa-list"></div>

            <div className="overlay"></div>
            <nav className="navLoggedIn">
              <img src="https://i.imgur.com/XoWNpJK.png" className="nav-logo" alt="cc-logo"/>
            <ul>
              <li className="nav-home"><a className="whiteLink" href="/">Home</a></li>
              <li className="nav-challenge-center"><a className="whiteLink" href="/challengecenter">Challenge Center</a></li>
              <li className="nav-profile"><a className="whiteLink" href="/profile">Profile</a></li>
              <li className="nav-logout"><a className="whiteLink" onClick={this.handleLogout}>Logout</a></li>
            </ul>
            </nav>
          </label>
        );
      }
    } else {
      return (<div></div>);
    }
	}
}

export default withRouter(Navbar);
