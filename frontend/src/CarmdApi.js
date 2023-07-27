import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CarmdApi {
	static token;

	/** Sends request to database  */
	static async request(endpoint, data = {}, method = "get") {
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${CarmdApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message;
			!err.response
				? (message = "Server error, please try again later")
				: (message = err.response.data.error.message);
			throw Array.isArray(message) ? message : [message];
		}
	}

	/** Register new user and get JWT */
	static async register(data) {
		const res = await this.request("users/register", data, "post");
		return res.token;
	}

	/** Log in existing user and get JWT. */
	static async login(data) {
		const res = await this.request("users/login", data, "post");
		const token = res.token;
		return { token };
	}

	/** Gets all info on user */
	static async getUser(username) {
		const res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Updates selected data on user  */
	static async updateUser(username, data) {
		const res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}
}

CarmdApi.token = localStorage.getItem("token");

export default CarmdApi;
