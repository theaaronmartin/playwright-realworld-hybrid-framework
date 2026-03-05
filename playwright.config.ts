import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 2,
	reporter: "html",

	use: {
		baseURL: "https://demo.realworld.show",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},

	projects: [
		{
			name: "setup",
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: "chromium",
			dependencies: ["setup"],
			testIgnore: /.*api\.spec\.ts/,
			use: {
				...devices["Desktop Chrome"],
				storageState: "playwright/.auth/user.json",
			},
		},
		{
			name: "api",
			testMatch: /.*api\.spec\.ts/,
			use: {
				storageState: { cookies: [], origins: [] },
				extraHTTPHeaders: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		},
	],
});
