import { test, expect } from "../fixtures/test-base";

test.describe("API-Only Article Management", { tag: "@api" }, () => {
	test("Backend Critical Path: Create and delete an article purely via API", async ({
		authHelper,
		articleHelper,
		request,
	}) => {
		const email = process.env.TEST_USER_EMAIL!;
		const password = process.env.TEST_USER_PASSWORD!;

		console.log("1. Authenticating via API...");
		const token = await authHelper.loginAndGetToken(email, password);

		console.log("2. Creating article via API...");
		const uniqueTitle = `Pure API Execution ${Date.now()}`;
		const responseJson = await articleHelper.createArticle(
			uniqueTitle,
			"Speed testing",
			"This article was created at the speed of light without a browser.",
			["api", "fast"],
			token,
		);

		expect(responseJson.article.title).toBe(uniqueTitle);
		expect(responseJson.article.author.username).toBeDefined();

		const slug = responseJson.article.slug;

		console.log(`3. Deleting article via API: ${slug}...`);
		await articleHelper.deleteArticle(slug, token);

		const fetchResponse = await request.get(
			`https://api.realworld.show/api/articles/${slug}`,
		);
		expect(fetchResponse.status()).toBe(404);
	});
});
