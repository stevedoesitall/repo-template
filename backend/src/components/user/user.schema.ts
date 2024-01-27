import { z } from "zod";

const schema = z.object({
	"id": z.string().uuid(),
	"email": z.string().email()
});

export { schema as userSchema };
