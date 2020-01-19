import React, { Component } from "react";
import { appConfig } from "./utils/constants";
import { UserSession } from "blockstack";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './App.css';
import WebsiteLists from "./pages/WebsiteLists";
import Login from './pages/Login';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userSession: new UserSession({ appConfig })
		};
	}



	componentDidMount = async () => {
		const { userSession } = this.state;
		if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
			const userData = await userSession.handlePendingSignIn();
			if (!userData.username) {
				throw new Error("This app requires a username");
			}
			window.location = "/";
		}
	};

	render() {
		const { userSession } = this.state;
		return (
			<Router>
				<Route path="/" exact render={() => (
					userSession.isUserSignedIn() ? <Redirect to="/sites" /> : <Login userSession={userSession} />
				)} />
				<Route path="/sites" exact component={() => <WebsiteLists userSession={userSession} />} />
			</Router>
		);
	}
}
export default App;