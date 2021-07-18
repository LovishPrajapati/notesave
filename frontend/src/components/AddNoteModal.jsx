import React, { useContext, useState } from "react";
import axios from "axios";
import { DataLayer } from "../DataLayer";
import { Button, Modal, Form } from "react-bootstrap";

function AddNoteModal({ show, handleClose }) {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const { user, setNotes, notes } = useContext(DataLayer);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (note.title || note.content) {
			axios
				.post(
					`/api/user/${user.id}/note`,
					{ title: note.title, content: note.content },
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				.then((res) => {
					handleClose();
					setNotes([...notes, res.data.note]);
					setNote({ title: "", content: "" });
				})
				.catch((e) => console.log(e));
		} else {
			handleClose();
		}
	};

	return (
		<>
			<Modal
				style={{ marginTop: "23vh", minheight: "500px" }}
				show={show}
				onHide={handleClose}
			>
				<Form style={{ padding: "20px" }} onSubmit={handleSubmit}>
					<h3>Add Note</h3>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Title....."
							value={note.title}
							onChange={(e) => setNote({ ...note, title: e.target.value })}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="textarea"
							style={{ resize: "none" }}
							placeholder="Enter here..."
							rows="5"
							value={note.content}
							onChange={(e) => setNote({ ...note, content: e.target.value })}
						/>
					</Form.Group>
					<Button type="submit" variant="primary">
						Save
					</Button>
				</Form>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddNoteModal;
