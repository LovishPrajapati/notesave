const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = process.env.SECERETKEY;
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.AWSID,
	secretAccessKey: process.env.AWSSECRET,
});
// const getUserDetails = async (req, res, next) => {
// 	res.status(200).json(req.user);
// };

const updateUserProfile = async (req, res, next) => {
	const { user } = req;
	console.log(user);
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	if (req.body.password) {
		user.password = req.body.password;
	}
	if (req.file) {
		let fileContent = fs.readFileSync(
			path.join(__dirname + "../../uploads/" + req.file.filename)
		);

		s3.upload(
			{ Bucket: process.env.BUCKETNAME, Key: `${user._id}`, Body: fileContent },
			(err, imageurl) => {
				if (err) {
					console.log(err);
				} else {
					user.profile = imageurl.Location;
				}
			}
		);
	}
	const updatedUser = await user.save();
	if (updatedUser) {
		res.status(200).json({
			name: updatedUser.fullname,
			notes: updatedUser.notes,
			profile: updatedUser.profile,
			token: jwt.sign({ token: updatedUser._id }, privateKey, {
				algorithm: "HS256",
			}),
		});
	} else {
		res.status(400).json({
			error: "Something went wrong. Error in updation",
		});
	}
};

const getUserById = async (req, res, next) => {
	const user = await User.findById(req.params._id).populate("notes");
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(204).json({
			error: "No such User",
		});
	}
};

const updateUser = async (req, res, next) => {
	const user = await User.findById(req.params._id).populate("notes");

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();
		if (updatedUser) {
			res.status(200).json({
				name: updatedUser.fullname,
				profile: user.profile,
				notes: user.notes,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: jwt.sign({ token: updatedUser._id }, privateKey, {
					algorithm: "HS256",
				}),
			});
		} else {
			res.status(400).json({
				error: "Something went wrong. Error in updation",
			});
		}
	} else {
		res.status(404).json({
			error: "User not found",
		});
	}
};

const deleteUser = async (req, res, next) => {
	const user = await User.findByIdAndDelete({ _id: req.params.id });
	if (user) {
		res.status(200).json({
			message: "User deleted succesfully",
		});
	} else {
		res.status(205).json({
			error: "Error in deletion",
		});
	}
};

const getAllUsers = async (req, res, next) => {
	const users = await User.find({}).select("-password -_id ");
	if (users) {
		res.status(200).json(users);
	} else {
		res.status(404).json({
			error: "No users registered",
		});
	}
};

module.exports = {
	// getUserDetails,
	updateUserProfile,
	getUserById,
	updateUser,
	deleteUser,
	getAllUsers,
};
