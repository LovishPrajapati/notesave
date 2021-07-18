import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataLayer } from "../DataLayer";
import Loader from "../components/Loader";
import axios from "axios";

const Signup = ({ history }) => {
	const { setUser } = useContext(DataLayer);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const [inputs, setInputs] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		cpassword: "",
	});

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(
				"/api/register",
				{
					firstname: inputs.fname,
					lastname: inputs.lname,
					email: inputs.email,
					password: inputs.password,
					cpassword: inputs.cpassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setUser(data);
			setLoading(false);
			sessionStorage.setItem("userData", JSON.stringify(data));
			alert(`${data.name}, You are successfully registered `);
			history.push(`/dashboard/${data.id}`);
		} catch (error) {
			setLoading(false);
			setErrors(error.response.data.error);
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
				<Card className="card-shadow">
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<i className="fas fa-user-plus fa-2x mt-4 "></i>
						<h4>Sign Up</h4>
						<span style={{ color: "red" }}>{errors.error}</span>
					</div>
					<Form style={{ padding: "20px" }} onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>
								<i className="fas fa-user mr-2 ml-1"></i>First Name
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter first name"
								value={inputs.fname}
								onChange={(e) =>
									setInputs({ ...inputs, fname: e.target.value })
								}
							/>
							<span style={{ color: "red" }}>{errors.name}</span>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<i className="fas fa-user mr-2 ml-1"></i>Last Name
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter last name"
								value={inputs.lname}
								onChange={(e) =>
									setInputs({ ...inputs, lname: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<i className="fas fa-envelope mr-2 ml-1"></i>Email address
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={inputs.email}
								onChange={(e) =>
									setInputs({ ...inputs, email: e.target.value })
								}
							/>
							<span style={{ color: "red" }}>{errors.email}</span>
						</Form.Group>

						<Form.Group>
							<Form.Label>
								<i className="fas fa-key mr-2 ml-1"></i>Password
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={inputs.password}
								onChange={(e) =>
									setInputs({ ...inputs, password: e.target.value })
								}
							/>
							<span style={{ color: "red" }}>{errors.password}</span>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<i className="fas fa-key mr-2 ml-1"></i>Confirm Password
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								value={inputs.cpassword}
								onChange={(e) =>
									setInputs({ ...inputs, cpassword: e.target.value })
								}
							/>
							<span style={{ color: "red" }}>{errors.cpassword}</span>
						</Form.Group>

						<Row style={{ alignItems: "center" }}>
							<Col>
								<Button variant="success" type="submit">
									Sign Up
								</Button>
							</Col>
							<Col>
								<Link
									to="/"
									style={{
										textDecoration: "none",
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									Have an account? Sign in now
								</Link>
							</Col>
						</Row>
					</Form>
				</Card>
			)}
		</Container>
	);
};

export default Signup;
