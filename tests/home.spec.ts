import { test } from "../fixtures/test-base";

test.describe("Home Page Interactions", () => {
	test("Should load the global feed on the home page", async ({ homePage }) => {
		await homePage.goto();
		await homePage.verifyGlobalFeedIsVisible();
	});
});
