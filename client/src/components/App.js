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
import AboutPage from './AboutPage';
import LandingPageNew from './LandingPageNew';
import Fellows from './Fellows';
import EditProfile from './EditProfile';
import Newsletter from './Newsletter';
import AboutUs from './AboutUs';
import PostNewsletterSignup from './PostNewsletterSignup';

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
								<LandingPageNew />
							)}
						/>
						<Route
							exact
							path="/about"
							render={() => (
								<AboutPage />
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
								<AdminRoute success={<CreateChallenge/>} fail={<LoginRegister/>} />
							)}
						/>
						<Route
							exact
							path="/dashboard"
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
						<Route
							exact
							path="/fellows"
							render={(props) => (
								<Fellows />
							)}
						/>
						<Route
							exact
							path="/editprofile"
							render={() => (
								<LoggedInRoute success={<EditProfile firstLog={false} />} fail={<LoginRegister/>} />
							)}
						/>
						<Route
							exact
							path="/welcome"
							render={() => (
								<LoggedInRoute success={<EditProfile firstLog={true} />} fail={<LoginRegister/>} />
							)}
						/>
						<Route
							exact
							path="/newsletter"
							render={(props) => (
								<Newsletter />
							)}
						/>
						<Route
							exact
							path="/aboutus"
							render={(props) => (
								<AboutUs />
							)}
						/>
						<Route
							exact
							path="/thankyou"
							render={(props) => (
								<PostNewsletterSignup />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
