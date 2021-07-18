import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { DataLayer } from "../DataLayer";

const ShowNoteModal = ({ showNote, handleCloseNote, note }) => {
	const { user, setNotes, notes } = useContext(DataLayer);
	const [noteUpdate, setNoteUpdate] = useState({
		title: note.title || "",
		content: note.content || "",
	});

	useEffect(() => {
		setNoteUpdate({
			title: note.title,
			content: note.content,
		});
	}, [note.title, note.content]);
	const deleteNote = () => {
		axios
			.delete(`/api/user/${user.id}/note/${note._id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((res) => {
				setNotes(notes.filter((element) => element._id !== note._id));
				handleCloseNote();
			})
			.catch((e) => console.log(e.response.data.error));
	};

	const updateNote = () => {
		axios
			.put(
				`/api/user/${user.id}/note/${note._id}`,
				{ title: noteUpdate.title, content: noteUpdate.content },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			)
			.then((res) => {
				let tempArray = notes.filter((element) => element._id !== note._id);
				tempArray.push(res.data.note);
				setNotes(tempArray);
				handleCloseNote();
			})
			.catch((e) => console.log(e.response.data.error));
	};

	const handleDelete = (e) => {
		e.preventDefault();
		if (window.confirm("Are you sure ? You wanna delete this.?")) deleteNote();
	};

	const handleUpdate = (e) => {
		e.preventDefault();

		if (
			noteUpdate.title !== note.title ||
			noteUpdate.content !== note.content
		) {
			updateNote();
		}
	};

	return (
		<>
			<Modal
				style={{ marginTop: "23vh", minheight: "500px" }}
				show={showNote}
				onHide={handleCloseNote}
			>
				<Form style={{ padding: "20px" }}>
					<h3>Note</h3>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Title....."
							value={noteUpdate.title}
							onChange={(e) =>
								setNoteUpdate({ ...noteUpdate, title: e.target.value })
							}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="textarea"
							style={{ resize: "none" }}
							placeholder="Enter here..."
							rows="5"
							value={noteUpdate.content}
							onChange={(e) =>
								setNoteUpdate({ ...noteUpdate, content: e.target.value })
							}
						/>
					</Form.Group>
					<Button type="submit" variant="success" onClick={handleUpdate}>
						Update
					</Button>
				</Form>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseNote}>
						Close
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ShowNoteModal;
