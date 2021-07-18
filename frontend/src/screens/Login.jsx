import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataLayer } from "../DataLayer";
import Loader from "../components/Loader";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [fieldError, setError] = useState("");
	const { user, setUser } = useContext(DataLayer);

	useEffect(() => {
		if (user) {
			history.push(`/dashboard/${user.id}`);
		}
	}, [history, user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(
				"/api/login",
				{
					email,
					password: pass,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setUser(data);
			sessionStorage.setItem("userData", JSON.stringify(data));
			setLoading(false);
			history.push(`/dashboard/${data.id}`);
		} catch (e) {
			setLoading(false);
			setError(e.response.data.error);
		}
	};

	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				minHeight: "80vh",
				alignItems: "center",
			}}
		>
			{isLoading ? (
				<Loader />
			) : (
				<Card className="card-shadow-login">
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<i className="fas fa-user fa-3x mt-4 "></i>
						<h4>Login</h4>
					</div>
					<Form
						method="POST"
						style={{ padding: "20px" }}
						onSubmit={submitHandler}
					>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								<i className="fas fa-envelope mr-2 ml-1"></i>Email address
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								autoComplete="true"
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								<i className="fas fa-key mr-2 ml-1"></i>Password
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={pass}
								onChange={(e) => {
									setPass(e.target.value);
								}}
							/>
						</Form.Group>
						<div style={{ width: "100%", textAlign: "center" }}>
							<span style={{ color: "red" }}>{fieldError}</span>
						</div>

						<Button variant="outline-success" type="submit">
							Login
						</Button>
						<Row style={{ alignItems: "center" }}>
							<Col>
								<Link to="/recoveraccount" style={{ textDecoration: "none" }}>
									Forgot password?
								</Link>
							</Col>
							<Col>
								<Link to="/signup" style={{ textDecoration: "none" }}>
									New User..?? Register now.
								</Link>
							</Col>
						</Row>
					</Form>
				</Card>
			)}
		</Container>
	);
};

export default Login;
