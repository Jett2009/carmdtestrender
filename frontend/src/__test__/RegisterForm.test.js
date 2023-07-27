import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import "@testing-library/jest-dom/extend-expect";

test("renders", () => {
	render(<RegisterForm />);
	expect(screen.getByText(/Create a new carmd account/)).toBeInTheDocument;
	expect(screen.queryByText(/Username/)).toBeInTheDocument;
});

test("matches snapshot", () => {
	const { asFragment } = render(<RegisterForm />);
	expect(asFragment()).toMatchSnapshot();
});
