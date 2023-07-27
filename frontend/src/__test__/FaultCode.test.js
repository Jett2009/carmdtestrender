// Import required testing libraries and the component to test
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FaultCode from "./FaultCode";

// Mock API
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				data: {
					codes: [
						{ code: "P1234", definition: "Fault code P1234 definition" },
						{ code: "P5678", definition: "Fault code P5678 definition" },
					],
				},
			}),
	})
);

describe("FaultCode Component", () => {
	test("renders form and submits data correctly", async () => {
		const { getByLabelText, getByText, getByTestId } = render(<FaultCode />);

		const makeInput = getByLabelText("Make:");
		const codesInput = getByLabelText("Codes:");
		const submitButton = getByText("Submit");

		fireEvent.change(makeInput, { target: { value: "Honda" } });
		fireEvent.change(codesInput, { target: { value: "P1234,P5678" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const codeCell1 = getByText("P1234");
		const definitionCell1 = getByText("Fault code P1234 definition");
		const codeCell2 = getByText("P5678");
		const definitionCell2 = getByText("Fault code P5678 definition");

		expect(codeCell1).toBeInTheDocument();
		expect(definitionCell1).toBeInTheDocument();
		expect(codeCell2).toBeInTheDocument();
		expect(definitionCell2).toBeInTheDocument();
	});

	test("handles API call error gracefully", async () => {
		global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

		const { getByLabelText, getByText, getByTestId } = render(<FaultCode />);

		const makeInput = getByLabelText("Make:");
		const codesInput = getByLabelText("Codes:");
		const submitButton = getByText("Submit");

		fireEvent.change(makeInput, { target: { value: "Honda" } });
		fireEvent.change(codesInput, { target: { value: "P1234,P5678" } });
		fireEvent.click(submitButton);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const errorMessage = getByText("Error occurred while fetching data");
		expect(errorMessage).toBeInTheDocument();
	});

	test("Google Search button is disabled when no codes entered", () => {
		const { getByText } = render(<FaultCode />);

		const googleSearchButton = getByText("Google Search");

		expect(googleSearchButton).toBeDisabled();
	});

	test("Google Search button is enabled when codes are entered", () => {
		const { getByText, getByLabelText } = render(<FaultCode />);

		const codesInput = getByLabelText("Codes:");
		const googleSearchButton = getByText("Google Search");

		fireEvent.change(codesInput, { target: { value: "P1234,P5678" } });

		expect(googleSearchButton).toBeEnabled();
	});
});
