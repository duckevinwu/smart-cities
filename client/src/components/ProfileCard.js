import React from 'react';

export default class ProfileCard extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      
    }
	}

	render() {

    if (this.props.authenticated === 'true') {
      return (
  			<div>
  				<div>{this.props.user.login}</div>
  				<div>{this.props.user.name}</div>
  				<div>{this.props.user.birthyear}</div>
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
