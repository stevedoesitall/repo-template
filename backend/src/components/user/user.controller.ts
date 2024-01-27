import { Request, Response, NextFunction as Next } from "express";
import ControllerTemplate from "../../templates/controller.template.js";
import { userService, UserService } from "./user.service.js";
import { users } from "@prisma/client";
// import passport from "passport";

interface CustomRequest extends Request {
	user: users;
}

class UserController extends ControllerTemplate {
	service = userService;

	constructor(service: UserService) {
		super(service);
	}

	getById = async (req: CustomRequest, res: Response) => {
		try {
			const id = req.params.id;
			const results = await this.service.getById(id);

			if (results) {
				return res
					.json({
						"ok": true,
						"data": results
					})
					.status(200);
			}

			return res.status(204).json();
		} catch (err) {
			return res.status(500).json({
				"ok": false,
				"error": err.message
			});
		} finally {
			console.log("getById finished.");
		}
	};

	checkLogin = async (req: CustomRequest, res: Response) => {
		if (req?.user?.id) {
			const results = await this.service.updateUser(req.user.id, {
				"lastViewDate": new Date()
			});
		}

		return res
			.json({
				"ok": true,
				"loggedIn": !!req.user,
				"data": {
					"email": req.user ? req.user.email : null,
					"id": req.user ? req.user.id : null
				}
			})
			.status(200);
	};

	// logout = (req: Request, res: Response, next: Next) => {
	// 	req.logout((err) => {
	// 		if (err) {
	// 			return next(err);
	// 		}
	// 	});

	// 	res.redirect("/");
	// };

	// authenticate = passport.authenticate("google", {
	// 	"scope": ["email", "profile"],
	// 	"prompt": "select_account"
	// });

	// redirect = passport.authenticate("google", {
	// 	"successRedirect": "/account",
	// 	"failureRedirect": "/"
	// });
}

export default new UserController(userService);
