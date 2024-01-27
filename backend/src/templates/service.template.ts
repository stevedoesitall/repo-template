import { PrismaClient } from "@prisma/client";

class ServiceTemplate {
	private prisma: PrismaClient;
	table = "";

	constructor(table: string) {
		this.table = table;
		this.prisma = new PrismaClient();
	}

	protected getPrisma(): PrismaClient {
		return this.prisma;
	}
}

export { ServiceTemplate };
