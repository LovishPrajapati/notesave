import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Col, Container, Row, Card } from "react-bootstrap";
import { DataLayer } from "../DataLayer";
import NoteError from "../components/NoteError";
import AddNoteModal from "../components/AddNoteModal";
import AddNoteButton from "../components/AddNoteButton";
import { motion } from "framer-motion";
import ShowNoteModal from "../components/ShowNoteModal";

const Dashboard = ({ match }) => {
	const [noteError, setNoteError] = useState("");
	const [show, setShow] = useState(false);
	const [showNote, setShowNote] = useState(false);
	const [currentNote, setcurrentNote] = useState({});
	const { user, setNotes, notes } = useContext(DataLayer);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleCloseNote = () => setShowNote(false);
	const handleShowNote = () => setShowNote(true);
	const noNotesError = "You don't have any note. Add one now.";
	useEffect(() => {
		axios
			.get(`/api/user/${match.params.id}/note`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((res) => setNotes(res.data.notes))
			.catch((e) => setNoteError(e.response.data.error));
	}, [match.params.id, user.token, setNotes]);

	const viewNote = (note) => {
		setcurrentNote(note);
		if (currentNote) {
			handleShowNote();
		}
	};
	return (
		<Container fluid className="p-3">
			{noteError ? (
				<NoteError error={noteError} />
			) : notes.length ? (
				<>
					<Row style={{ marginTop: "10%" }}>
						{notes.map((element) => (
							<Col key={element._id} lg={2} md={3} sm={4} xs={6}>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.9 }}
								>
									<Card
										onClick={() => viewNote(element)}
										className="note"
										style={{
											maxHeight: "200px",
											minHeight: "200px",
											overflow: "hidden",
											marginBottom: "20px",
										}}
									>
										<Card.Header
											as="p"
											style={{ fontSize: "12px", textAlign: "right" }}
										>
											{new Date(element.dateUpdated).toLocaleString()}
										</Card.Header>
										<Card.Body>
											<Card.Title as="h5" style={{ overflowX: "hidden" }}>
												{element.title}
											</Card.Title>
											<Card.Text>{element.content}</Card.Text>
										</Card.Body>
									</Card>
								</motion.div>
							</Col>
						))}
					</Row>
				</>
			) : (
				<NoteError error={noNotesError} />
			)}
			<AddNoteModal show={show} handleClose={handleClose} />
			<ShowNoteModal
				note={currentNote}
				showNote={showNote}
				handleCloseNote={handleCloseNote}
			/>

			{noteError ? "" : <AddNoteButton onClick={handleShow} />}
		</Container>
	);
};

export default Dashboard;
