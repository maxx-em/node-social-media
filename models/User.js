const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	display: {
		type: String,
		required: false,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	posts: {
		type: Object,
		required: false,
	},
	likes: {
		type: Object,
		required: false,
	},
});

module.exports = model("Users", UserSchema);
