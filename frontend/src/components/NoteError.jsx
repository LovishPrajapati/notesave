import { Container, Row, Col } from "react-bootstrap";

const NoteError = ({ error }) => {
	return (
		<Container
			style={{
				height: "78vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Row>
				<Col>
					<h3>{error}</h3>
				</Col>
			</Row>
		</Container>
	);
};

export default NoteError;
