import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 1,
	reporter: "html",

	use: {
		baseURL: "https://demo.realworld.show",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		extraHTTPHeaders: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	},

	projects: [
		{
			name: "setup",
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				storageState: "playwright/.auth/user.json",
			},

			dependencies: ["setup"],
		},
	],
});
