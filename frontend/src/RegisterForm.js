import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useHandleChange, useValidate, useErrors } from "./hooks";
import "./static/styles/Register.css";
import CarmdApi from "./CarmdApi";
import Errors from "./Errors";

/** Form to register new user */
function RegisterForm({ username, updateCurrentUser }) {
	const [isLoading, setIsLoading] = useState(false);
	const initialState = { username: "", password: "", password2: "", email: "" };
	const [data, handleChange, setData] = useHandleChange(initialState);
	const [formErrors, validate] = useValidate();
	const [apiErrors, getApiErrors, setApiErrors] = useErrors();
	const history = useHistory();

	/** Redirects to home if already logged in */
	if (username) {
		return <Redirect to="/" />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setApiErrors({});

		/** Checks form for errors.
		 * If errors, stops form submission and sets errors object
		 */
		const isSignUpForm = true;
		const err = validate(data, isSignUpForm);
		if (Object.keys(err).length > 0) {
			setData({ ...data, password: "", password2: "" });
			return false;
		} else {
			setIsLoading(true);

			/** Removes second password from data object */
			const dataObj = data;
			delete dataObj.password2;
			setData(dataObj);

			/** Submit new user to database.s
			 * Get API token.
			 * Logs in new user by putting username/token into state and local storage
			 * Redirects to home
			 */
			try {
				const token = await CarmdApi.register(data);
				updateCurrentUser(data.username, token);
				CarmdApi.token = token;
				history.push("/");
			} catch (err) {
				setData({ ...data, password2: "" });
				getApiErrors(err);
				setIsLoading(false);
			}
		}
	};

	if (isLoading) {
		return <Spinner style={{ width: "3rem", height: "3rem" }} />;
	}

	return (
		<div className="container">
			<h2 className="formheading">Create a new account</h2>
			<Errors formErrors={formErrors} apiErrors={apiErrors} />
			<Form onSubmit={handleSubmit} className="register">
				<FormGroup>
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						value={data.username}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={data.password}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password2">Retype Password</Label>
					<Input
						type="password"
						name="password2"
						id="password2"
						placeholder="Retype Password"
						value={data.password2}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">Email</Label>
					<Input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
						value={data.email}
						onChange={handleChange}
					/>
				</FormGroup>
				<Button className="button">Register</Button>
			</Form>
		</div>
	);
}

export default RegisterForm;
