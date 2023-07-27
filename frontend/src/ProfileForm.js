import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useHandleChange, useValidate, useErrors } from "./hooks";
import "./static/styles/Register.css";
import CarmdApi from "./CarmdApi";
import Errors from "./Errors";

function ProfileForm({ username, updateCurrentUser }) {
	const initialState = {
		email: "",
		password: "",
		password2: "",
		make: "",
		model: "",
		vin: "",
		mileage: "",
		year: "",
	};

	const [isLoading, setIsLoading] = useState(true);
	const [formErrors, validate] = useValidate();
	const [data, handleChange, setData] = useHandleChange(initialState);
	const [apiErrors, getApiErrors, setApiErrors] = useErrors();
	const history = useHistory();

	useEffect(() => {
		async function getUserInfo() {
			if (!username) {
				history.push("/login");
				return false;
			}

			try {
				const user = await CarmdApi.getUser(username);
				setData({ email: user.email });
			} catch (e) {
				getApiErrors(e);
			}
			setIsLoading(false); // Move this inside the try-catch block
		}
		getUserInfo(username);
	}, [username, setData, setIsLoading, history, getApiErrors]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setApiErrors({});

		const isSignUpForm = false;
		const err = validate(data, isSignUpForm);
		if (Object.keys(err).length > 0) {
			setData({
				...data,
				password: "",
				password2: "",
				make: "",
				model: "",
				vin: "",
				mileage: "",
				year: "",
			});
			return false;
		} else {
			setIsLoading(true);

			try {
				await CarmdApi.updateUser(username, data);
				updateCurrentUser(username, localStorage.getItem("token"));
				history.push("/");
			} catch (e) {
				setData({
					...data,
					password: "",
					password2: "",
					make: "",
					model: "",
					vin: "",
					mileage: "",
					year: "",
				});
				getApiErrors(e);
			}
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Spinner style={{ width: "3rem", height: "3rem" }} />;
	}
	return (
		<div className="container">
			<h2 className="formheading">Update Info For {username}</h2>
			<Errors formErrors={formErrors} apiErrors={apiErrors} />
			{Object.keys(apiErrors).length === 0 && (
				<Form onSubmit={handleSubmit} className="register">
					<FormGroup>
						<Label htmlFor="password">New Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="New Password"
							value={data.password || ""}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="password2">Retype New Password</Label>
						<Input
							type="password"
							name="password2"
							id="password2"
							placeholder="Retype New Password"
							value={data.password2 || ""}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							type="text"
							name="email"
							id="email"
							value={data.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<Button className="button">Update User Info</Button>

					{/* <div>
						<h1>Add a Vehicle</h1>
						<h3>
							Please fill out the required fields for adding your new vehicle:
						</h3>
						<br />
						<br />
						<FormGroup>
							<Label htmlFor="make">Make</Label>
							<Input
								type="text"
								name="make"
								id="make"
								value={data.make}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="model">Model</Label>
							<Input
								type="text"
								name="model"
								id="model"
								value={data.model}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="year">Year</Label>
							<Input
								type="text"
								name="year"
								id="year"
								value={data.year}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="vin">Vin</Label>
							<Input
								type="text"
								name="vin"
								id="vin"
								value={data.vin}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="mileage">Mileage</Label>
							<Input
								type="text"
								name="mileage"
								id="mileage"
								value={data.mileage}
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<Button className="button">Add Vehicle</Button> */}
				</Form>
			)}
		</div>
	);
}

export default ProfileForm;
