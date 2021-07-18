require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

mongoose.connect(
	process.env.DBURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 5000 || process.env.PORT;

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user/:id/note", noteRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "build", "index.html")
		);
	});
}
app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}`);
});
