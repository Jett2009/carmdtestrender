import React, { useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Table,
	Alert,
} from "reactstrap";

//const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
//const PARTNER_TOKEN = process.env.REACT_APP_PARTNER_TOKEN;

const AUTH_KEY = `Basic NjExODMxNWItZjYyMC00YzQ1LWJkOTItODFiNDhmZTc0YmEy`;
const PARTNER_TOKEN = "b5a74cb2b8c64030a63937e8cfea16a1";

function VINDecode() {
	const [vin, setVin] = useState("");
	const [response, setResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleVinChange = (event) => {
		setVin(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		try {
			const url = `https://api.carmd.com/v3.0/decode?vin=${vin}`;

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

			if (data.data) {
				setResponse(data.data);
			} else {
				setResponse("VIN not valid");
			}
		} catch (error) {
			console.error(error);
			setResponse("VIN not valid");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h1>VIN Decode</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="vin">VIN:</Label>
					<Input type="text" id="vin" value={vin} onChange={handleVinChange} />
				</FormGroup>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
			</Form>
			<div style={{ border: "3px solid black", padding: "10px" }}>
				<h2>Response:</h2>
				{response && response !== "VIN not valid" ? (
					<Table>
						<thead>
							<tr>
								<th>Year</th>
								<th>Make</th>
								<th>Model</th>
								<th>Manufacturer</th>
								<th>Engine</th>
								<th>Trim</th>
								<th>Transmission</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{response.year}</td>
								<td>{response.make}</td>
								<td>{response.model}</td>
								<td>{response.manufacturer}</td>
								<td>{response.engine}</td>
								<td>{response.trim}</td>
								<td>{response.transmission}</td>
							</tr>
						</tbody>
					</Table>
				) : (
					<Alert color="danger">{response}</Alert>
				)}
			</div>
		</div>
	);
}

export default VINDecode;
