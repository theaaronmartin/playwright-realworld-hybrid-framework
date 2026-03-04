import { APIRequestContext, expect } from "@playwright/test";

export class ArticleHelper {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	/**
	 * Deletes an article using the backend API.
	 */
	async deleteArticle(slug: string, token: string) {
		const response = await this.request.delete(
			`https://api.realworld.show/api/articles/${slug}`,
			{
				headers: {
					Authorization: `Token ${token}`, // The API requires the token to prove you own the article
				},
			},
		);

		if (!response.ok()) {
			console.error(`Failed to delete article. Status: ${response.status()}`);
		}

		expect(
			response.ok(),
			"API should successfully delete the article",
		).toBeTruthy();
	}
}
