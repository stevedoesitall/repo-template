import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import app from "../../dist/servers/app.js";
import { userService } from "../../dist/components/user/user.service.js";

const testPort = 5051;

let server;

before((done) => {
	server = app.listen(testPort, done);
});

describe("Users API", () => {
	describe("/id/:id", () => {
        afterEach(() => {
            sinon.restore();
          });

		it("should return a 200 status", async () => {
            const getUserByIdStub = sinon.stub(userService, "getById").resolves({
                "id": "sampleUserId",
                "username": "testUser",
              });
        
              const response = await request(app).get("/users/id/sampleUserId");
        
              expect(response.status).to.equal(200);
              expect(response.body).to.deep.equal({
                "data": {
                    "id": "sampleUserId",
                    "username": "testUser",
                  },
                  "ok": true
              });
        
              getUserByIdStub.restore();
		});

		it("should return a 204 status", async () => {
            const getUserByIdStub = sinon.stub(userService, "getById").resolves(null);

            const response = await request(app).get("/users/id/nonExistentUserId");
      
            expect(response.status).to.equal(204);
      
            getUserByIdStub.restore();
		});
	});
});

after((done) => {
	server.close(() => {
		console.log("Test server closed successfully");
		done();
	});
});
