import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./static/styles/Form.css";
import { useHandleChange, useErrors } from "./hooks";
import Errors from "./Errors";
import CarmdApi from "./CarmdApi";

function LoginForm({ username, updateCurrentUser }) {
	const initialState = { username: "", password: "" };

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [data, handleChange, setData] = useHandleChange(initialState);
	const [apiErrors, getApiErrors, setApiErrors] = useErrors();
	const history = useHistory();

	/** Redirects to home if already logged in */
	if (username) {
		return <Redirect to="/" />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setApiErrors({});

		/** Validates login form and sets error if missing fields */
		if (!data.username || !data.password) {
			setErrors({ error: "Username and Password are required" });
			setData(initialState);
			return false;
		} else {
			setIsLoading(true);

			/** Checks for valid name/password combination.
			 * Returns API token.
			 
			 */
			try {
				const { token } = await CarmdApi.login(data);
				updateCurrentUser(data.username, token);
				CarmdApi.token = token;
				history.push("/");
			} catch (e) {
				getApiErrors(e);
				setData(initialState);
				setIsLoading(false);
			}
		}
	};

	if (isLoading) {
		return <Spinner style={{ width: "3rem", height: "3rem" }} />;
	}

	return (
		<div className="container">
			<Errors formErrors={errors} apiErrors={apiErrors} />
			{
				<Form onSubmit={handleSubmit}>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
							<Input
								type="text"
								name="username"
								id="username"
								placeholder="Username"
								value={data.username}
								onChange={handleChange}
							/>
						</InputGroupAddon>
						<Input
							type="password"
							name="password"
							id="password"
							value={data.password}
							placeholder="Password"
							onChange={handleChange}
							className="mid"
						/>
						<InputGroupAddon addonType="append">
							<Button className="button">Log In</Button>
						</InputGroupAddon>
					</InputGroup>
				</Form>
			}
		</div>
	);
}

export default LoginForm;
