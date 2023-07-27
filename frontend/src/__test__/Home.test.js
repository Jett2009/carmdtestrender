import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders", () => {
	render(
		<BrowserRouter>
			<Home />
		</BrowserRouter>
	);
	expect(screen.getByText(/Create a carmd account/)).toBeInTheDocument;
});

test("renders logged in", () => {
	render(
		<BrowserRouter>
			<Home username={"test"} />
		</BrowserRouter>
	);
	expect(screen.getByText(/Welcome back, test/)).toBeInTheDocument;
});

test("matches snapshot", () => {
	const { asFragment } = render(
		<BrowserRouter>
			<Home />
		</BrowserRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
