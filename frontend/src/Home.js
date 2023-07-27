import React from "react";
import { Link } from "react-router-dom";
import "./static/styles/Home.css";

function Home({ username }) {
	return (
		<div className="container">
			<h1>Car-Klub</h1>

			{username && (
				<p>
					Welcome back to Car Klub<br></br> {username}!
					<br />
					So, what brings you back today? Need to check on a specific fault
					code? Planning your car's maintenance schedule? Or perhaps you're
					curious about the specifics of your vehicle through its VIN number?
					Whatever it is, we've got you covered!
				</p>
			)}
			{!username && (
				<p>
					<p>
						Welcome to Car Klub, your one-stop destination for all things
						automotive! Whether you're a seasoned car enthusiast or a casual
						driver, our platform is designed to empower you with the knowledge
						and tools to keep your vehicle running smoothly.
					</p>
					Are you new here? Registering with Car Klub gives you access to a
					database of car fault codes and maintenance information. No more
					mysterious warning lights or expensive trips to the mechanic. Our
					user-friendly search function allows you to identify any fault codes
					providing you with explanations and possible solutions.
					<br></br>
					<Link to="/register">Create a Car-Klub account</Link>
					<br></br>
					Thank you for being a part of the Car Klub community.
				</p>
			)}
		</div>
	);
}

export default Home;
