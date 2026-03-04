import { test, expect } from "../fixtures/test-base";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Authentication UI", { tag: "@login-ui" }, () => {
	test("User can log in successfully via the UI", async ({
		loginPage,
		homePage,
		page,
	}) => {
		const email = process.env.TEST_USER_EMAIL!;
		const password = process.env.TEST_USER_PASSWORD!;
		expect(email, "TEST_USER_EMAIL must be set").toBeDefined();

		await loginPage.goto();
		await loginPage.login(email, password);

		await expect(homePage.yourFeedTab).toBeVisible();
		await expect(page).toHaveURL("https://demo.realworld.show/");
	});
});
