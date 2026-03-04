import { test, expect } from "../fixtures/test-base";

const invalidArticleData = [
	{
		testName: "fails when title is missing",
		title: "",
		description: "A valid description",
		body: "A valid body",
		tags: "playwright",
		expectedError: "title can't be blank",
	},
	{
		testName: "fails when description is missing",
		title: `Title ${Date.now()}`,
		description: "",
		body: "A valid body",
		tags: "playwright",
		expectedError: "description can't be blank",
	},
	{
		testName: "fails when body is missing",
		title: `Title ${Date.now()}`,
		description: "A valid description",
		body: "",
		tags: "playwright",
		expectedError: "body can't be blank",
	},
];

test.describe("Article Validation (Data-Driven)", { tag: "@errors" }, () => {
	for (const data of invalidArticleData) {
		test(`Data-Driven: Article creation ${data.testName}`, async ({
			articlePage,
		}) => {
			await articlePage.gotoEditor();
			await articlePage.createArticle(
				data.title,
				data.description,
				data.body,
				data.tags,
			);
			await expect(articlePage.errorMessages).toContainText(data.expectedError);
		});
	}
});
