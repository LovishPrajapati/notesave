import React, { useState, useContext } from "react";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";
import { DataLayer } from "../DataLayer";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
	const { user, setUser } = useContext(DataLayer);
	const [inputs, setInputs] = useState({
		profile: user.profile,
		fname:
			user.name.length === 1
				? user.name
				: user.name
						.split(" ")
						.splice(0, user.name.split(" ").length - 1)
						.join(" "),
		lname: user.name.split(" ")[user.name.split(" ").length - 1] || " ",
		password: "",
	});
	const submitHandler = async (e) => {
		e.preventDefault();
		const myform = document.getElementById("user-update-form");
		const formdata = new FormData(myform);
		formdata.append("profile", inputs.profile, inputs.profile.filename);
		try {
			const { data } = await axios.put(`/api/users/profile`, formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${user.token}`,
				},
			});
			console.log(data);

			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container style={{ marginTop: "56px" }}>
			{user ? (
				<>
					<Row style={{ minHeight: "200px" }}>
						<Col className="text-center">
							<Image
								src={user.profile}
								height="200px"
								width="200px"
								alt="User Profile Image"
								roundedCircle
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form onSubmit={submitHandler} id="user-update-form">
								<Form.Group>
									<Form.Label>
										<i className="fas fa-envelope mr-2 ml-1"></i>Email address
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={user.email}
										disabled
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										<i className="fas fa-image mr-2 ml-1"></i>Upload profile
									</Form.Label>
									<Form.Group>
										<Form.File
											onChange={(e) =>
												setInputs({ ...inputs, profile: e.target.files[0] })
											}
										/>
									</Form.Group>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										<i className="fas fa-user mr-2 ml-1"></i>First Name
									</Form.Label>
									<Form.Control
										name="firstname"
										type="text"
										placeholder="Enter first name"
										value={inputs.fname}
										onChange={(e) =>
											setInputs({ ...inputs, fname: e.target.value })
										}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>
										<i className="fas fa-user mr-2 ml-1"></i>Last Name
									</Form.Label>
									<Form.Control
										name="lastname"
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
										<i className="fas fa-key mr-2 ml-1"></i>New Password
									</Form.Label>
									<Form.Control
										name="password"
										type="password"
										placeholder="Password"
										value={inputs.password}
										onChange={(e) =>
											setInputs({ ...inputs, password: e.target.value })
										}
									/>
								</Form.Group>

								<Row style={{ alignItems: "center" }}>
									<Col>
										<Link to={`/dashboard/${user.id}`}>
											<Button
												variant="secondary"
												type="submit"
												className="mr-3"
											>
												Back
											</Button>
										</Link>

										<Button variant="success" type="submit">
											Update Profile
										</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</>
			) : (
				<h1>ERROR</h1>
			)}
		</Container>
	);
};

export default Profile;
