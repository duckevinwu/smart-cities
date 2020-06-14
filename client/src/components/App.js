import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Test from './Test';
import AuthenticatedRoute from './AuthenticatedRoute';
import Register from './Register';
import Profile from './Profile';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"

						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Test />
							)}
						/>
						<Route
							exact
							path="/login"
							render={() => (
								<AuthenticatedRoute success="/profile" fail={<Login/>}/>
							)}
						/>
						<Route
							exact
							path="/register"
							render={() => (
								<AuthenticatedRoute success="/profile" fail={<Register/>} />
							)}
						/>
						<Route
							exact
							path="/profile"
							render={() => (
								<Profile />
							)}
						/>
						<Route
							exact
							path="/forgotpassword"
							render={() => (
								<AuthenticatedRoute success="/profile" fail={<ForgotPassword/>} />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
