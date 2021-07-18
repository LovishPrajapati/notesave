import { Button } from "react-bootstrap";

const AddNoteButton = ({ onClick }) => {
	return (
		<Button
			onClick={onClick}
			className="add-note"
			size="lg"
			style={{
				position: "fixed",
				bottom: "6vh",
				right: "40px",
				borderRadius: "100%",
			}}
		>
			<i className="fas fa-file"></i>
		</Button>
	);
};

export default AddNoteButton;
