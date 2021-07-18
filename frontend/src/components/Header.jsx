import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { DataLayer } from "../DataLayer";
import { Link } from "react-router-dom";

const logout = (e) => {
	e.preventDefault();
	sessionStorage.removeItem("userData");
	alert("Signed Out.");
	window.location.href = "/";
};

const Header = () => {
	const { user } = useContext(DataLayer);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
			<Navbar.Brand>NoteSave</Navbar.Brand>
			{user && (
				<>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link className="ml-auto" eventKey="1">
								<Link
									className="ml-auto py-2"
									// to={`/dashboard/${user.id}/profile`}
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									{user.name}
								</Link>
							</Nav.Link>
							<Nav.Link className="ml-auto" eventKey="2">
								<Button onClick={logout} variant="danger">
									Sign Out
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</>
			)}
		</Navbar>
	);
};

export default Header;
