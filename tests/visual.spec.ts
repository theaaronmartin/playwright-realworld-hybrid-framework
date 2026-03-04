import { test, expect } from "../fixtures/test-base";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Visual Regression Testing", { tag: "@visual" }, () => {
	test("The Login Page should perfectly match the visual baseline", async ({
		loginPage,
		page,
	}) => {
		await loginPage.goto();
		await expect(loginPage.signInButton).toBeVisible();
		await expect(page).toHaveScreenshot("login-page-baseline.png", {
			maxDiffPixelRatio: 0.02,
		});
	});
});
