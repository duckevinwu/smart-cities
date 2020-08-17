import React from 'react';
import '../style/Navbar.css';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
      isLoaded: false,
			isAdmin: false
		}

		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
    fetch("/auth/navbarAuthentication",
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
      var isAuthenticated = data.authenticated;
			var isAdmin = data.admin;

      if (isAuthenticated) {
        this.setState({
          isLoggedIn: true
        });
      }

			if (isAdmin) {
				this.setState({
					isAdmin: true
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
              <li className="nav-home-lo"><a className="whiteLink" href="/"><i className="fa fa-home"></i> Home</a></li>
              <li className="nav-challenge-center-lo"><a className="whiteLink" href="/challengecenter"><i className="fa fa-bullseye"></i> Challenge Center</a></li>
              <li className="nav-login-lo"><a className="whiteLink" href="/login"><i className="fa fa-sign-in"></i> Login/Register</a></li>
            </ul>
            </nav>
          </label>
        );
      } else {
				if (this.state.isAdmin) {
					return (
						<label>
	            <input type="checkbox" className="navWrapper"/>
	            <div className="handler fa fa-list"></div>

	            <div className="overlay"></div>
	            <nav className="navAdmin">
	              <img src="https://i.imgur.com/XoWNpJK.png" className="nav-logo" alt="cc-logo"/>
	            <ul>
	              <li className="nav-home-admin"><a className="whiteLink" href="/"><i className="fa fa-home"></i> Home</a></li>
	              <li className="nav-challenge-center-admin"><a className="whiteLink" href="/challengecenter"><i className="fa fa-bullseye"></i> Challenge Center</a></li>
	              <li className="nav-profile-admin"><a className="whiteLink" href="/profile"><i className="fa fa-user"></i> Profile</a></li>
								<li className="nav-dashboard-admin"><a className="goldLink" href="/dashboard"><i className="fa fa-list-ul"></i> Dashboard</a></li>
								<li className="nav-create-challenge-admin"><a className="goldLink" href="/createchallenge"><i className="fa fa-plus-square-o"></i> Create Challenge</a></li>
	              <li className="nav-logout-admin"><a className="whiteLink" onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Logout</a></li>
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
	              <li className="nav-home"><a className="whiteLink" href="/"><i className="fa fa-home"></i> Home</a></li>
	              <li className="nav-challenge-center"><a className="whiteLink" href="/challengecenter"><i className="fa fa-bullseye"></i> Challenge Center</a></li>
	              <li className="nav-profile"><a className="whiteLink" href="/profile"><i className="fa fa-user"></i> Profile</a></li>
	              <li className="nav-logout"><a className="whiteLink" onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Logout</a></li>
	            </ul>
	            </nav>
	          </label>
	        );
				}
      }
    } else {
      return (<div></div>);
    }
	}
}

export default withRouter(Navbar);
