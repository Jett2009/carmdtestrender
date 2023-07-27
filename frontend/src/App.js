import React, { useState } from "react";
import "./static/styles/App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";

function App() {
	const [username, setUsername] = useState(localStorage.getItem("username"));

	/** Sets state and local storage
	 */
	function updateCurrentUser(name, token) {
		setUsername(name);
		if (name === "") {
			localStorage.removeItem("username");
			localStorage.removeItem("token");
		} else {
			localStorage.setItem("username", name);
			localStorage.setItem("token", token);
		}
	}

	return (
		<div className="App">
			<div id={"content-wrap"}>
				<NavBar username={username} />
				<Routes username={username} updateCurrentUser={updateCurrentUser} />
			</div>
		</div>
	);
}

export default App;
