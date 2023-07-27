// Import required testing libraries and the component to test
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VINDecode from "./VINDecode";

// Mock API
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				year: "2020",
				make: "Honda",
				model: "Civic",
				manufacturer: "Honda Motor Co., Ltd.",
				engine: "2.0L I4",
				trim: "EX",
				transmission: "Automatic",
			}),
	})
);

describe("VINDecode Component", () => {
	test("renders form and submits VIN correctly", async () => {
		const { getByLabelText, getByText } = render(<VINDecode />);

		const vinInput = getByLabelText("VIN:");
		const submitButton = getByText("Submit");

		fireEvent.change(vinInput, { target: { value: "1HGCM82633A123456" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const yearCell = getByText("2020");
		const makeCell = getByText("Honda");
		const modelCell = getByText("Civic");
		const manufacturerCell = getByText("Honda Motor Co., Ltd.");
		const engineCell = getByText("2.0L I4");
		const trimCell = getByText("EX");
		const transmissionCell = getByText("Automatic");

		expect(yearCell).toBeInTheDocument();
		expect(makeCell).toBeInTheDocument();
		expect(modelCell).toBeInTheDocument();
		expect(manufacturerCell).toBeInTheDocument();
		expect(engineCell).toBeInTheDocument();
		expect(trimCell).toBeInTheDocument();
		expect(transmissionCell).toBeInTheDocument();
	});

	test("handles API call error gracefully", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

		const { getByLabelText, getByText } = render(<VINDecode />);

		const vinInput = getByLabelText("VIN:");
		const submitButton = getByText("Submit");

		fireEvent.change(vinInput, { target: { value: "1HGCM82633A123456" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const errorMessage = getByText("Error occurred while fetching data");
		expect(errorMessage).toBeInTheDocument();
	});
});
