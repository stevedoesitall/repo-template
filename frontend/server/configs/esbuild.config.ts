import fs from "node:fs";
import { build, context } from "esbuild";
import esbuildSvelte from "esbuild-svelte";

import sveltePreprocess from "svelte-preprocess";
import { sassPlugin } from "esbuild-sass-plugin";
import { copy } from "esbuild-plugin-copy";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";

import envVars from "./env.config.js";

let baseUrl: string = envVars.url;

if (envVars.environment === "development") {
	baseUrl = baseUrl + ":" + envVars.bePort;
}

const isDev = process.argv.includes("--mode=dev");

const esbuildDestroy = {
	"name": "esbuild-destroy",
	setup(build: any) {
		build.onStart(() => {
			if (fs.existsSync("./build")) {
				fs.rmSync("./build", {
					"recursive": true,
					"force": true
				});
			}

			fs.mkdirSync("./build");
		});
	}
};

// HTML bundler
const esbuildHTML = {
	"name": "esbuild-html",
	setup(build: any) {
		build.onStart(() => {
			const pages = fs
				.readdirSync("./client/public")
				.filter((file) => file.includes(".html"));

			for (const page of pages) {
				if (!fs.existsSync(`./build/${page}`)) {
					fs.writeFileSync(`./build/${page}`, "");
				}

				fs.copyFileSync(`./client/public/${page}`, `./build/${page}`);
			}
		});
	}
};

const esbuildOptions: any = {
	"entryPoints": ["./client/src/main.ts"],
	"bundle": true,
	"minify": true,
	"treeShaking": true,
	"outfile": "build/build.js",
	"sourcemap": isDev,
	"platform": "browser",
	"logLevel": "info",
	"define": {
		"process.env.BASE_URL": `'${baseUrl}'`
	},
	"plugins": [
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([
					purgecss({
						"content": [
							"./client/public/index.html",
							"./client/src/App.svelte",
							"./client/src/**/*.svelte"
						]
					}),
					autoprefixer,
					postcssPresetEnv({
						"stage": 1
					})
				]).process(source, { "from": undefined });
				return css;
			}
		}),
		esbuildSvelte({
			"preprocess": sveltePreprocess()
		}),
		esbuildDestroy,
		esbuildHTML,
		copy({
			"assets": [
				{
					"from": "./client/public/images/*",
					"to": "./images"
				}
			]
		})
	]
};

if (isDev) {
	const runDev = async () => {
		const ctx = await context(esbuildOptions);
		await ctx.watch();
	};

	runDev();
} else {
	build(esbuildOptions);
}