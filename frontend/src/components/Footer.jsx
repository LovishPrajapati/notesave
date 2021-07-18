import { Container, Row, Col } from "react-bootstrap";
import React from "react";

const Footer = () => {
	return (
		<footer>
			<Container
				fluid
				style={{
					display: "flex",
					position: "fixed",
					bottom: 0,
					backgroundColor: "#343a40",
					height: "5vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Row>
					<Col className="text-center text-white py-3">
						Copyright {new Date().getFullYear()} &copy; NoteSave
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
