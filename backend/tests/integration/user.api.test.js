import request from "supertest";
import { expect } from "chai";

import app from "../../dist/servers/app.js";

const testPort = 5051;

const server = app.listen(testPort, () => {
	return true;
});

describe("Users API", () => {
	describe("/id/:id", () => {
		it("should return a 200 status", async () => {
			const goodId = "8173b937-40cd-4b69-9cdc-527fb8c9fe91";
			const results = await request(app).get("/users/id/" + goodId);
			expect(results.status).to.equal(200);
		});

		it("should return a 204 status", async () => {
			const badId = "8173b937-40cd-4b69-9cdc-527fb8c9fe92";
			const results = await request(app).get("/users/id/" + badId);
			expect(results.status).to.equal(204);
		});
	});
});

after(async () => {
	try {
		await new Promise((resolve) => server.close(resolve));
		console.log("Test server closed successfully");
	} catch (err) {
		console.error("Error closing test server:", err);
	}
});
