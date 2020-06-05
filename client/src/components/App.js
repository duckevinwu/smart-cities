import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Test from './Test';
//import Dashboard from './Dashboard';
//import FindFriends from './FindFriends';

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
						{/* ---- Part 2 (FindFriends) ---- */}
						{/* TODO (1) - Add a Route for the path "/FindFriends" */}
						<Route
							exact
							path="/FindFriends"
							render={() => (
								<Test />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
