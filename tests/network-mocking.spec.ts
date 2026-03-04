import { test, expect } from "../fixtures/test-base";

test.describe("Advanced Network Mocking", { tag: "@mocking" }, () => {
	test("UI gracefully handles a 500 Internal Server Error when publishing", async ({
		page,
		articlePage,
	}) => {
		await page.route(/\/api\/articles/, async (route) => {
			if (route.request().method() === "POST") {
				console.log("Intercepted POST to /api/articles. Forcing a 500 Error!");

				await route.fulfill({
					status: 500,
					contentType: "application/json",
					body: JSON.stringify({
						errors: {
							"Server Engine": [
								"experienced a catastrophic failure. Please try again later.",
							],
						},
					}),
				});
			} else {
				await route.fallback();
			}
		});

		await articlePage.gotoEditor();
		await articlePage.createArticle(
			"The Backend Crash Test",
			"Testing UI resilience",
			"This article will never reach the database.",
			"mocking",
		);

		const expectedErrorMessage = page.getByText(
			"Server Engine experienced a catastrophic failure.",
		);

		await expect(expectedErrorMessage).toBeVisible();
		await expect(page).toHaveURL(/.*\/editor/);
	});
});
