// Import required testing libraries and the component to test
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MaintenanceInfo from "./MaintenanceInfo";

// Mock api
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ data: "Your mock response data here" }),
	})
);

describe("MaintenanceInfo Component", () => {
	test("renders form and submits data correctly", async () => {
		// Render the component
		const { getByLabelText, getByText } = render(<MaintenanceInfo />);

		const vinInput = getByLabelText("VIN:");
		const yearInput = getByLabelText("Year:");
		const makeInput = getByLabelText("Make:");
		const modelInput = getByLabelText("Model:");
		const mileageInput = getByLabelText("Mileage:");
		const submitButton = getByText("Submit");

		fireEvent.change(vinInput, { target: { value: "12345678901234567" } });
		fireEvent.change(yearInput, { target: { value: "2020" } });
		fireEvent.change(makeInput, { target: { value: "Honda" } });
		fireEvent.change(modelInput, { target: { value: "Civic" } });
		fireEvent.change(mileageInput, { target: { value: "50000" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const responseTable = getByText("Your mock response data here");
		expect(responseTable).toBeInTheDocument();
	});

	test("handles API call failure gracefully", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ error: "Internal Server Error" }),
			})
		);

		const { getByLabelText, getByText } = render(<MaintenanceInfo />);

		const vinInput = getByLabelText("VIN:");
		const submitButton = getByText("Submit");

		fireEvent.change(vinInput, { target: { value: "12345678901234567" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const errorMessage = getByText("Error: Internal Server Error");
		expect(errorMessage).toBeInTheDocument();
	});
});
