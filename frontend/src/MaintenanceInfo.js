import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import CarMakeDropdown from "./CarMakeDropdown";

//const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
//const PARTNER_TOKEN = process.env.REACT_APP_PARTNER_TOKEN;

const AUTH_KEY = `Basic NjExODMxNWItZjYyMC00YzQ1LWJkOTItODFiNDhmZTc0YmEy`;
const PARTNER_TOKEN = "b5a74cb2b8c64030a63937e8cfea16a1";

function MaintenanceInfo() {
	const [vin, setVin] = useState("");
	const [year, setYear] = useState("");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [mileage, setMileage] = useState("");
	const [response, setResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleVinChange = (event) => {
		setVin(event.target.value);
	};

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handleMakeChange = (event) => {
		setMake(event.target.value);
	};

	const handleModelChange = (event) => {
		setModel(event.target.value);
	};

	const handleMileageChange = (event) => {
		setMileage(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if ((vin && !mileage) || (!vin && (!year || !make || !model || !mileage))) {
			alert("Please fill in all required form fields.");
			return;
		}

		setIsLoading(true);

		try {
			let url = `https://api.carmd.com/v3.0/maint?`;

			if (vin) {
				url += `vin=${vin}&mileage=${mileage}`;
			} else {
				url += `year=${year}&make=${make}&model=${model}&mileage=${mileage}`;
			}

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
			setResponse(data.data);
			console.log(response);
		} catch (error) {
			console.error(error);
			setResponse([]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h1>Maintenance Information</h1>
			<h3>Please enter VIN and Mileage, or Year, Make, Model, Mileage.</h3>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="vin">VIN:</Label>
					<Input type="text" id="vin" value={vin} onChange={handleVinChange} />
				</FormGroup>
				<FormGroup>
					<Label for="year">Year:</Label>
					<Input
						type="text"
						id="year"
						value={year}
						onChange={handleYearChange}
					/>
				</FormGroup>
				<FormGroup>
					<CarMakeDropdown value={make} onChange={handleMakeChange} />
				</FormGroup>
				<FormGroup>
					<Label for="model">Model:</Label>
					<Input
						type="text"
						id="model"
						value={model}
						onChange={handleModelChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="mileage">Mileage:</Label>
					<Input
						type="text"
						id="mileage"
						value={mileage}
						onChange={handleMileageChange}
					/>
				</FormGroup>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
			</Form>
			<div style={{ border: "3px solid black", padding: "10px" }}>
				<h2>Response:</h2>
				{response.length > 0 ? (
					<Table>
						<thead>
							<tr>
								<th>Description</th>
								<th>Due Mileage</th>
								<th>Total Cost</th>
								<th>Part</th>
								<th>Price</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{response.map((item, index) => (
								<tr key={index}>
									<td>{item.desc}</td>
									<td>{item.due_mileage}</td>
									<td>{item.repair.total_cost}</td>
									<td>
										{item.parts && item.parts.length > 0
											? item.parts[0].desc
											: "N/A"}
									</td>
									<td>
										{item.parts && item.parts.length > 0
											? item.parts[0].price
											: "N/A"}
									</td>
									<td>
										{item.parts && item.parts.length > 0
											? item.parts[0].qty
											: "N/A"}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<p>No maintenance information available.</p>
				)}
			</div>
		</div>
	);
}

export default MaintenanceInfo;
