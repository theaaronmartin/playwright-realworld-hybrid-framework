import { test, expect } from "../fixtures/test-base";

test.describe("Article Management", () => {
	let authToken: string;
	let articleSlug: string = "";

	test.afterEach(async ({ page, articleHelper }) => {
		if (articleSlug) {
			const token = await page.evaluate(() =>
				window.localStorage.getItem("jwtToken"),
			);
			if (token) {
				console.log(`Cleaning up article via API: ${articleSlug}`);
				await articleHelper.deleteArticle(articleSlug, token);
			}
		}
	});

	test(
		"Critical Path: User can create and delete an article entirely via the UI",
		{ tag: "@create-ui" },
		async ({ page, homePage, articlePage }) => {
			const uniqueTitle = `UI End-to-End ${Date.now()}`;

			await homePage.goto();
			await expect(
				page.getByRole("link", { name: "New Article" }),
			).toBeVisible();

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
		},
	);

	test(
		"Hybrid Path: User can create an article (API Auth + API Teardown)",
		{ tag: "@hybrid" },
		async ({ page, articlePage }) => {
			const uniqueTitle = `Hybrid Approach ${Date.now()}`;

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
