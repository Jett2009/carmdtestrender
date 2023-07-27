import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import CarMakeDropdown from "./CarMakeDropdown";

//const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
//const PARTNER_TOKEN = process.env.REACT_APP_PARTNER_TOKEN;

const AUTH_KEY = `Basic NjExODMxNWItZjYyMC00YzQ1LWJkOTItODFiNDhmZTc0YmEy`;
const PARTNER_TOKEN = "b5a74cb2b8c64030a63937e8cfea16a1";

function FaultCode() {
	const [make, setMake] = useState("");
	const [codes, setCodes] = useState("");
	const [response, setResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleMakeChange = (event) => {
		setMake(event.target.value);
	};

	const handleCodesChange = (event) => {
		setCodes(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!make || !codes) {
			alert("Please fill in all form fields.");
			return;
		}
		setIsLoading(true);
		try {
			const url = `https://api.carmd.com/v3.0/code?make=${make}&codes=${codes}`;

			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: AUTH_KEY,
					"Partner-Token": PARTNER_TOKEN,
				},
			});

			if (!response.ok) {
				throw new Error("API request failed.");
			}

			const data = await response.json();
			setResponse(data.data.codes);
			console.log(response);
		} catch (error) {
			console.error(error);
			setResponse([]);
		} finally {
			setIsLoading(false);
		}
	};
	const handleGoogleSearch = () => {
		if (codes) {
			const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
				codes
			)}`;
			window.open(searchUrl, "_blank");
		}
	};

	return (
		<div>
			<h1>Fault Code</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<CarMakeDropdown value={make} onChange={handleMakeChange} />
				</FormGroup>
				<FormGroup>
					<Label for="codes">Codes:</Label>
					<Input
						type="text"
						id="codes"
						value={codes}
						onChange={handleCodesChange}
					/>
				</FormGroup>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
				{response.length > 0 && (
					<Button onClick={handleGoogleSearch} disabled={!codes}>
						Google Search
					</Button>
				)}
			</Form>
			<p>
				Please enter your Make and Engine code, and let us handle the rest. We
				will supply you with the code definition, and a link to some of the best
				repair guides out.
			</p>
			<div style={{ border: "3px solid black", padding: "10px" }}>
				<h2>Response:</h2>
				{response.length > 0 ? (
					<Table>
						<thead>
							<tr>
								<th>Fault Code</th>
								<th>Definition</th>
							</tr>
						</thead>
						<tbody>
							{response.map((item, index) => (
								<tr key={index}>
									<td>{item.code}</td>
									<td>{item.definition}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<p>No fault code data available.</p>
				)}
			</div>
		</div>
	);
}

export default FaultCode;
