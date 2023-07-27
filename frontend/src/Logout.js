import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import CarmdApi from "./CarmdApi";

function Logout({ updateCurrentUser }) {
	useEffect(() => {
		updateCurrentUser("", "", "");
		CarmdApi.token = "";
	}, [updateCurrentUser]);

	return <Redirect to="/" />;
}

export default Logout;
