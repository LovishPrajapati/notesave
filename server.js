require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
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
	},
	() => {
		console.log("DB connected");
		app.listen(PORT, () => {
			console.log(`Server up and running on port ${PORT}`);
		});
	}
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 5000 || process.env.PORT;

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user/:id/note", noteRoutes);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

// app.listen(PORT, () => {
// 	console.log(`Server up and running on port ${PORT}`);
// });
