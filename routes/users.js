const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("<h1>Main Users Router</h1>");
});

router.get("/find/:id", async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({
			code: 400,
			message: "Please provide a id.",
		});
	}

	try {
		const user = await User.findOne({ _id: id });

		if (user) {
			res.status(200).json({
				code: res.statusCode,
				message: "Found!",
				data: user,
			});
		}
	} catch (err) {
		res.status(404).json({
			code: res.statusCode,
			message: "Can't user with the ID given!",
		});
	}
});

router.post("/create", async (req, res, next) => {
	// Create a new user and adds to the database.

	const { username, email, password } = req.body;

	if (!email || !password || !username) {
		res.status(400).json({
			code: 400,
			message: "One of the credentials hasnt been provided.",
		});
	}

	try {
		const user = await User.create({
			username: username,
			email: email,
			password: password,
		});

		res.status(201).json({
			code: 200,
			message: "Successfully created your account.",
		});
	} catch (err) {
		console.log(`ERROR: ${err}`);
	}
});

router.get("/:id/posts", async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a id.",
		});
	}

	try {
		const posts = await Post.find({ author: id });

		console.log(posts);

		if (posts) {
			res.status(200).json({
				code: res.statusCode,
				message: "Got all post by user",
				data: posts,
			});
		}
	} catch (err) {
		res.status(404).json({
			code: res.statusCode,
			message: err.message,
		});
	}
});

module.exports = router;
