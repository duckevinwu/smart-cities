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
import ResetPassword from './ResetPassword';
import ActivateAccount from './ActivateAccount';
import LandingPage from './LandingPage';
import AdminRoute from './AdminRoute';
import CreateChallenge from './CreateChallenge';
import Dashboard from './Dashboard';
import ChallengeCenter from './ChallengeCenter';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<LandingPage />
							)}
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
							path="/challengecenter"
							render={() => (
								<ChallengeCenter />
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
						<Route
							exact
							path="/resetpassword/:email/:token"
							render={(props) => (
								<ResetPassword {...props} />
							)}
						/>
						<Route
							exact
							path="/confirmation/:email/:token"
							render={(props) => (
								<ActivateAccount {...props} />
							)}
						/>
						<Route
							exact
							path="/createchallenge"
							render={() => (
								<AdminRoute success={<CreateChallenge/>} fail={<Login/>} />
							)}
						/>
						<Route
							exact
							path="/mychallenges"
							render={() => (
								<AdminRoute success={<Dashboard/>} fail={<Login/>} />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
