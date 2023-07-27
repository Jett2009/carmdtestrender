let jwt = require("jsonwebtoken");

let { ACCESS_TOKEN_SECRET } = require("../config");

//return signed JWT from user data

function createToken(user) {
	let payload = {
		username: user.username,
	};

	return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}

module.exports = { createToken };
