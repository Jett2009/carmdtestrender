"use strict";

const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Checks for valid token, stores in res.locals if exists */
function authenticateJWT(req, res, next) {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer /, "").trim();
			res.locals.user = jwt.verify(token, ACCESS_TOKEN_SECRET);
		}
		return next();
	} catch (err) {
		return next();
	}
}

/** Checks that res.locals user matches user in username params */
function ensureCorrectUser(req, res, next) {
	try {
		if (!res.locals.user) throw new UnauthorizedError();
		if (res.locals.user.username === req.params.username) {
			return next();
		} else {
			throw new UnauthorizedError();
		}
	} catch (err) {
		return next(err);
	}
}

module.exports = { authenticateJWT, ensureCorrectUser };
