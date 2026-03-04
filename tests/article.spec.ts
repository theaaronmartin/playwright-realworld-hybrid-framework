import { test, expect } from "../fixtures/test-base";

test.describe("Article Management", () => {
	let authToken: string;
	let articleSlug: string = "";

	test.afterEach(async ({ articleHelper }) => {
		if (articleSlug && authToken) {
			console.log(`Cleaning up article via API: ${articleSlug}`);
			await articleHelper.deleteArticle(articleSlug, authToken);
		}
	});

	test("Critical Path: User can create and delete an article entirely via the UI", async ({
		page,
		loginPage,
		articlePage,
	}) => {
		const email = process.env.TEST_USER_EMAIL!;
		const password = process.env.TEST_USER_PASSWORD!;
		const uniqueTitle = `UI End-to-End ${Date.now()}`;

		await loginPage.goto();
		await loginPage.login(email, password);
		await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();

		await articlePage.gotoEditor();
		await articlePage.createArticle(
			uniqueTitle,
			"Full UI Test",
			"This was created and will be deleted using only the UI.",
			"e2e",
		);

		const articleHeader = page.getByRole("heading", { name: uniqueTitle });
		await expect(articleHeader).toBeVisible();

		await articlePage.deleteArticle();
		await expect(page).toHaveURL("https://demo.realworld.show/");
	});

	test(
		"Hybrid Path: User can create an article (API Auth + API Teardown)",
		{ tag: "@hybrid" },
		async ({ page, authHelper, articlePage }) => {
			const email = process.env.TEST_USER_EMAIL!;
			const password = process.env.TEST_USER_PASSWORD!;
			const uniqueTitle = `Hybrid Approach ${Date.now()}`;

			authToken = await authHelper.loginAndGetToken(email, password);
			await authHelper.injectToken(page, authToken);

			await articlePage.gotoEditor();
			await expect(articlePage.publishButton).toBeVisible({ timeout: 15000 });
			await articlePage.createArticle(
				uniqueTitle,
				"Hybrid Test",
				"This was created via UI, but auth and teardown use the API.",
				"hybrid",
			);

			const articleHeader = page.getByRole("heading", { name: uniqueTitle });
			await expect(articleHeader).toBeVisible({ timeout: 15000 });

			const currentUrl = page.url();
			articleSlug = currentUrl.split("/").pop() || "";
		},
	);
});
