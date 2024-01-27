import crypto from "node:crypto";

import { ServiceTemplate } from "../../templates/service.template.js";
import { userSchema } from "./user.schema.js";
import { PrismaClient, users } from "@prisma/client";
const prisma = new PrismaClient();
const TABLE = "users";

class UserService extends ServiceTemplate {
	constructor(table: string) {
		super(table);
	}

	getById = async (id: string) => {
		const results: users[] = await this.getPrisma().$queryRaw`
            SELECT * FROM users WHERE id = ${id};
        `;

		if (!results.length) {
			return null;
		}

		return results[0];
	};

	getByEmail = async (email: string) => {
		const results: users[] = await this.getPrisma().$queryRaw`
            SELECT * FROM users WHERE email = ${email};
        `;

		if (!results.length) {
			return null;
		}

		return results[0];
	};

	createUser = async (email: string) => {
		const userId = crypto.randomUUID();

		const user = {
			"id": userId,
			"email": email
		};

		const emailCheck: users[] = await this.getPrisma().$queryRaw`
			SELECT * FROM users WHERE email = ${email};
		`;

		try {
			if (emailCheck.length > 0) {
				throw new Error("Email exists.");
			}
		} catch (err) {
			return {
				"error": err.message
			};
		}

		try {
			userSchema.parse(user);
		} catch (err) {
			return {
				"error": err.issues[0].message
			};
		}

		const results = await this.getPrisma().$queryRaw`
            INSERT INTO users (id, email) VALUES
            (${userId}, ${email}) RETURNING id, email;
        `;

		return results[0];
	};

	updateUser = async (id, data) => {
		const camelToSnakeCase = (str) =>
			str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

		for (const item in data) {
			const fieldNameSnake = camelToSnakeCase(item);
			data[fieldNameSnake] = data[item];
			delete data[item];
		}

		const results = await this.getPrisma().users.update({
			"where": {
				"id": id
			},
			data
		});

		return !!results.id;
	};
}

const userService = new UserService(TABLE);

export { userService, UserService };
