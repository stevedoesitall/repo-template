import dotenv from "dotenv";

dotenv.config({
	"path": "../.env"
});

const envVars: any = {
	"url": process.env.URL,
	"environment": process.env.ENVIRONMENT,
	"bePort": process.env.BE_PORT,
	"fePort": process.env.FE_PORT
};

export default envVars;
