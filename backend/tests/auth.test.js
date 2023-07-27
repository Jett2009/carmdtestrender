const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const { authenticateJWT, ensureCorrectUser } = require("../middleware/auth");
const { ACCESS_TOKEN_SECRET } = require("../config");

const testJwt = jwt.sign({ username: "test" }, ACCESS_TOKEN_SECRET);
const badJwt = jwt.sign({ username: "test" }, "wrong");

describe("authenticateJWT", function () {
	test("success: via header", function () {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${testJwt}` } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({
			user: {
				iat: expect.any(Number),
				username: "test",
			},
		});
	});

	test("success: no header", function () {
		expect.assertions(2);
		const req = {};
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});

	test("success: invalid token", function () {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${badJwt}` } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});
});

describe("ensureCorrectUser", function () {
	test("success: correct user", function () {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: { user: { username: "test" } } };
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureCorrectUser(req, res, next);
	});

	test("unauth: wrong user", function () {
		expect.assertions(1);
		const req = { params: { username: "wrong" } };
		const res = { locals: { user: { username: "test" } } };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUser(req, res, next);
	});

	test("unauth: no user", function () {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: {} };
		const next = function (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUser(req, res, next);
	});
});
