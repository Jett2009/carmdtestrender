const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("../models/user.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
} = require("./testCommonModels");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("login", function () {
	test("success", async function () {
		const user = await User.login("u1", "password1");
		expect(user).toEqual({
			username: "u1",
		});
	});

	test("unauth if no such user", async function () {
		try {
			await User.login("error", "password");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});

	test("unauth if wrong password", async function () {
		try {
			await User.login("u1", "wrong");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

describe("register", function () {
	const newUser = {
		username: "new",
		email: "test@test.com",
	};

	test("success", async function () {
		let user = await User.register({
			...newUser,
			password: "password",
		});
		expect(user).toEqual({
			username: "new",
		});
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].hashed_pwd.startsWith("$2b$")).toEqual(true);
	});

	test("request with duplicate data", async function () {
		try {
			await User.register({
				...newUser,
				password: "password",
			});
			await User.register({
				...newUser,
				password: "password",
			});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

describe("get", function () {
	test("success", async function () {
		let user = await User.get("u1");
		expect(user).toEqual({
			username: "u1",
			email: "u1@email.com",
		});
	});

	test("not found ", async function () {
		try {
			await User.get("error");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

describe("update", function () {
	const updateData = {
		email: "new@email.com",
	};

	test("success", async function () {
		let res = await User.update("u1", updateData);
		expect(res).toEqual({
			username: "u1",
			...updateData,
		});
	});

	test("success: set password", async function () {
		let res = await User.update("u1", {
			password: "new",
		});
		expect(res).toEqual({
			username: "u1",
			email: "u1@email.com",
		});
		const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].hashed_pwd.startsWith("$2b$")).toEqual(true);
	});

	test("not found ", async function () {
		try {
			await User.update("error", {
				zipCode: "test",
			});
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
