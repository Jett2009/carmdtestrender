import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import ProfileForm from "./ProfileForm";
import FaultCode from "./FaultCode";
import MaintenanceInfo from "./MaintenanceInfo";
import VINDecode from "./VinDecode";

function Routes({ username, updateCurrentUser }) {
	return (
		<Switch>
			<Route exact path="/">
				<Home username={username} />
			</Route>
			<Route exact path="/register">
				<RegisterForm
					username={username}
					updateCurrentUser={updateCurrentUser}
				/>
			</Route>
			<Route exact path="/login">
				<LoginForm username={username} updateCurrentUser={updateCurrentUser} />
			</Route>
			<Route exact path="/profile">
				<ProfileForm
					username={username}
					updateCurrentUser={updateCurrentUser}
				/>
			</Route>
			<Route exact path="/logout">
				<Logout updateCurrentUser={updateCurrentUser} />
			</Route>
			<Route exact path="/faultcode">
				<FaultCode />
			</Route>
			<Route exact path="/maintenanceinfo">
				<MaintenanceInfo />
			</Route>
			<Route exact path="/vindecode">
				<VINDecode />
			</Route>

			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
