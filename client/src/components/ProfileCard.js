import React from 'react';
import { withRouter } from 'react-router-dom';

class ProfileCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {

    }

		this.handleLogout = this.handleLogout.bind(this);
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

    if (this.props.authenticated === 'true') {
      return (
  			<div>
  				<div>{this.props.user.login}</div>
  				<div>{this.props.user.name}</div>
  				<div>{this.props.user.birthyear}</div>
					<button onClick={this.handleLogout}>Log out</button>
  			</div>
  		);
    } else {
      return (
        <div>
          <p><a href="/login">Log in</a> to view.</p>
        </div>
      )
    }


	}
}

export default withRouter(ProfileCard);
