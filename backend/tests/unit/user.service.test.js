import { expect } from "chai";
import sinon from "sinon";
import { PrismaClient } from "@prisma/client";
import { userService } from "../../dist/components/user/user.service.js";

describe("UserService", () => {
	const goodUser = {
		"id": "8173b937-40cd-4b69-9cdc-527fb8c9fe91",
		"email": "steve@steve.com",
		"create_date": "2023-12-31 01:30:33.939",
		"last_view_date": "2023-12-31 01:31:33.939"
	};

	const badUser = {
		"id": "68c8d6a7-4e61-4f3a-9061-f787291aa067",
		"email": "bad@email.com",
		"create_date": "2023-12-31 01:30:33.939",
		"last_view_date": "2023-12-31 01:31:33.939"
	};

	let stub;

	beforeEach(() => {
		stub = sinon.stub(PrismaClient.prototype, "$queryRaw");
	});

	afterEach(() => {
		stub.restore();
	});

	describe("getById", () => {
		it("should return one user based on ID", async () => {
			stub.resolves([goodUser]);

			const user = await userService.getById(goodUser.id);

			expect(stub.calledOnce).to.be.true;
			expect(user?.id).to.equal(goodUser.id);
		});

		it("should return no users based on ID", async () => {
			stub.resolves([]);
			
			const user = await userService.getById(badUser.id);

			expect(stub.calledOnce).to.be.true;
			expect(user).to.null;
		});
	});

	describe("getByEmail", () => {
		it("should return one user based on email", async () => {
			stub.resolves([goodUser]);

			const user = await userService.getByEmail(goodUser.email);

			expect(stub.calledOnce).to.be.true;
			expect(user?.email).to.equal(goodUser.email);
		});

		it("should return no users based on email", async () => {
			stub.resolves([]);

			const user = await userService.getByEmail(badUser.email);

			expect(stub.calledOnce).to.be.true;
			expect(user).to.be.null;
		});
	});
});
