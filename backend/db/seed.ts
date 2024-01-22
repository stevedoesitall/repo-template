import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
	await prisma.users.deleteMany({});

	const userOne = await prisma.users.upsert({
		"where": { "id": "8173b937-40cd-4b69-9cdc-527fb8c9fe91" },
		"update": {},
		"create": {
			"id": "8173b937-40cd-4b69-9cdc-527fb8c9fe91",
			"email": "steve@alloy.com"
		}
	});

	console.log({
		userOne
	});
};

try {
	main();
} catch (err) {
	console.log(err);
	process.exit(1);
} finally {
	prisma.$disconnect();
}
