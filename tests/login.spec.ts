import { test, expect } from "../fixtures/test-base";

test.describe("Authentication UI", { tag: "@login-ui" }, () => {
	test("User can log in successfully via the UI", async ({
		loginPage,
		homePage,
		page,
	}) => {
		// 1. Ensure our environment variables are present
		const email = process.env.TEST_USER_EMAIL!;
		const password = process.env.TEST_USER_PASSWORD!;
		expect(email, "TEST_USER_EMAIL must be set").toBeDefined();

		// 2. Perform the UI actions using our Page Object
		await loginPage.goto();
		await loginPage.login(email, password);

		// 3. Assert we are logged in by checking for an element on the Home Page
		// The Conduit app shows "Your Feed" only when logged in.
		await expect(homePage.yourFeedTab).toBeVisible();

		// Optional: We can also assert the URL changed to the root
		await expect(page).toHaveURL("https://demo.realworld.show/");
	});
});
