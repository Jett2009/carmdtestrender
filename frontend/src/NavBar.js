import React from "react";
import "./static/styles/NavBar.css";
import { NavLink as NotNavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

function NavBar({ username }) {
	return (
		<div>
			<Navbar color="dark">
				<div className="container">
					<NavbarBrand href="/" className="inactive">
						Carmd
					</NavbarBrand>
					{
						<Nav>
							{!username && (
								<>
									<NavItem>
										<NavLink
											to="/register"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											Register
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											to="/login"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											Log In
										</NavLink>
									</NavItem>
								</>
							)}
							{username && (
								<>
									<NavItem>
										<NavLink
											to="/faultcode"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											Fault Code
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink
											to="/maintenanceinfo"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											Maintenance
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink
											to="/vindecode"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											VIN Decode
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink
											to="/profile"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											{username}
										</NavLink>
									</NavItem>

									<NavItem>
										<NavLink
											to="/logout"
											className="inactive"
											activeClassName="active"
											tag={NotNavLink}
										>
											Log Out
										</NavLink>
									</NavItem>
								</>
							)}
						</Nav>
					}
				</div>
			</Navbar>
		</div>
	);
}

export default NavBar;
