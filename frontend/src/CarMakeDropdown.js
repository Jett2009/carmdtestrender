import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const carManufacturers = [
	"Abarth",
	"Acura",
	"Alfa Romeo",
	"Aston Martin",
	"Audi",
	"Bentley",
	"BMW",
	"Bugatti",
	"Cadillac",
	"Chevrolet",
	"Chrysler",
	"Citroën",
	"Dacia",
	"Daewoo",
	"Daihatsu",
	"Dodge",
	"Donkervoort",
	"DS",
	"Ferrari",
	"Fiat",
	"Fisker",
	"Ford",
	"Honda",
	"Hummer",
	"Hyundai",
	"Infiniti",
	"Iveco",
	"Jaguar",
	"Jeep",
	"Kia",
	"KTM",
	"Lada",
	"Lamborghini",
	"Lancia",
	"Land Rover",
	"Landwind",
	"Lexus",
	"Lotus",
	"Maserati",
	"Maybach",
	"Mazda",
	"McLaren",
	"Mercedes-Benz",
	"MG",
	"Mini",
	"Mitsubishi",
	"Morgan",
	"Nissan",
	"Opel",
	"Peugeot",
	"Porsche",
	"Renault",
	"Rolls-Royce",
	"Rover",
	"Saab",
	"Seat",
	"Skoda",
	"Smart",
	"SsangYong",
	"Subaru",
	"Suzuki",
	"Tesla",
	"Toyota",
	"Volkswagen",
	"Volvo",
];

function CarMakeDropdown({ value, onChange }) {
	return (
		<FormGroup>
			<Label for="make">Make:</Label>
			<Input type="select" id="make" value={value} onChange={onChange}>
				<option value="">Select a car manufacturer</option>
				{carManufacturers.map((manufacturer) => (
					<option key={manufacturer} value={manufacturer}>
						{manufacturer}
					</option>
				))}
			</Input>
		</FormGroup>
	);
}

export default CarMakeDropdown;
