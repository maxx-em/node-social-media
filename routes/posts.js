const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/create", async (req, res, next) => {
	const { author, description } = req.body;

	if (!author || !description) {
		res.status(400).json({
			code: 400,
			message: "One of the parameters hasnt been provided.",
		});
	}

	try {
		const post = await Post.create({
			author: author,
			description: description,
		});

		res.status(201).json({
			code: 200,
			message: "Successfully created a post!",
		});

		console.log(post);
	} catch (err) {
		res.status(400).json({
			code: res.statusCode,
			message: `${err.message}`,
		});
	}
});

router.post("/:id/like", async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a id.",
		});
	}

	try {
		const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } });

		res.status(200).json({
			code: res.statusCode,
			message: `❤ Liked post: ${id}`,
		});
	} catch (err) {
		res.status(404).json({
			code: res.statusCode,
			message: "Can't find post with the ID given!",
		});
	}
});

router.post("/:id/comment", async (req, res, next) => {
	const id = req.params.id;
	const { author, comment } = req.body;

	if (!id) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a id.",
		});
	} else if (!author || !comment) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a the required data.",
		});
	}

	try {
		const result = await Post.findByIdAndUpdate(id, {
			$push: { [`comments.${author}`]: comment },
		});

		console.log(result);

		res.status(201).json({
			code: res.statusCode,
			message: "Successfully added the comment.",
		});
	} catch (err) {
		res.status(400).json({
			code: res.statusCode,
			message: err.message,
		});
	}
});

router.delete("/:id/delete", async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a id.",
		});
	}

	try {
		const post = await Post.findByIdAndDelete(id);

		if (post) {
			res.status(200).json({
				code: res.statusCode,
				message: "Successfully deleted the comment.",
			});
		} else {
			res.status(404).json({
				code: res.statusCode,
				message: "Post does not exist.",
			});
		}
	} catch (err) {
		res.status(400).json({
			code: res.statusCode,
			message: err.message,
		});
	}
});

module.exports = router;
