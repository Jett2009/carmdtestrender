"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers");
const {
	BadRequestError,
	UnauthorizedError,
	NotFoundError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
	/** Creates new user */
	static async register({ username, password, email }) {
		/** Checks for unique username.
		 */
		const isDuplicate = await db.query(
			`SELECT username
            FROM users
            WHERE username = $1`,
			[username]
		);
		if (isDuplicate.rows[0]) {
			throw new BadRequestError("Username already taken");
		}

		/** Enters new user into database */
		const hashedPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
                    (username, 
                    password, 
                    email) 
            VALUES ($1, $2, $3) 
            RETURNING username`,
			[username, password, email]
		);

		const user = result.rows[0];
		return user;
	}

	/** Retrieves user information
	 */
	static async login(username, password) {
		const result = await db.query(
			`SELECT username, 
                    password,
					email
            FROM users 
            WHERE username = $1`,
			[username]
		);

		const user = result.rows[0];

		if (user) {
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError("Invalid username/password");
	}

	/** Gets info on single user */
	static async get(username) {
		const result = await db.query(
			`SELECT username
            FROM users
            WHERE username = $1`,
			[username]
		);

		let user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		return user;
	}

	/** Updates info on a single user */
	static async update(username, data) {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
		}

		const { setCols, values } = sqlForPartialUpdate(data, {
			password: "password",
		});
		const usernameVarIdx = "$" + (values.length + 1);

		const querySql = `UPDATE users 
						 SET ${setCols} 
						 WHERE username = ${usernameVarIdx} 
						 RETURNING username, email`;

		const result = await db.query(querySql, [...values, username]);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		delete user.password;
		return user;
	}
}

module.exports = User;
