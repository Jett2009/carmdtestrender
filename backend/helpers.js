const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("./config");

/** Creates token using JWT */
function createToken(user) {
	let payload = {
		username: user.username,
	};

	return jwt.sign(payload, ACCESS_TOKEN_SECRET);
}

/** Creates SQL query for updating info when not all info is likely to
 * be updated.
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError("No data");

	const cols = keys.map(
		(colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
	);

	return {
		setCols: cols.join(", "),
		values: Object.values(dataToUpdate),
	};
}

module.exports = { createToken, sqlForPartialUpdate };
