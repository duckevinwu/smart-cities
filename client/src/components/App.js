import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Test from './Test';
import AuthenticatedRoute from './AuthenticatedRoute';
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
import ChallengePage from './ChallengePage';
import LoggedInRoute from './LoggedInRoute';
import IdeaForm from './IdeaForm';
import ProposalForm from './ProposalForm';
import ViewSubmissions from './ViewSubmissions';
import LoginRegister from './LoginRegister';

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
								<AuthenticatedRoute success="/profile" fail={<LoginRegister/>}/>
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
						<Route
							exact
							path="/challenges/:id"
							render={(props) => (
								<ChallengePage {...props} />
							)}
						/>
						<Route
							exact
							path="/submitidea/:challengeid"
							render={(props) => (
								<LoggedInRoute success={<IdeaForm {...props} />} fail={<Login/>} />
							)}
						/>
						<Route
							exact
							path="/submitproposal/:challengeid"
							render={(props) => (
								<LoggedInRoute success={<ProposalForm {...props} />} fail={<Login/>} />
							)}
						/>
						<Route
							exact
							path="/viewsubmissions/:challengeid"
							render={(props) => (
								<ViewSubmissions {...props} />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
