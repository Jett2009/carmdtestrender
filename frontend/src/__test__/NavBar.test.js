import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders", () => {
	render(
		<BrowserRouter>
			<NavBar />
		</BrowserRouter>
	);
	expect(screen.getByText(/carmd/)).toBeInTheDocument;
});

test("renders logged out", () => {
	render(
		<BrowserRouter>
			<NavBar />
		</BrowserRouter>
	);
	expect(screen.getByText(/Log In/)).toBeInTheDocument;
});

test("matches snapshot", () => {
	const { asFragment } = render(
		<BrowserRouter>
			<NavBar />
		</BrowserRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
