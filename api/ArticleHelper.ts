import { APIRequestContext, expect } from "@playwright/test";

export class ArticleHelper {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async createArticle(
		title: string,
		description: string,
		body: string,
		tagList: string[],
		token: string,
	) {
		const response = await this.request.post(
			"https://api.realworld.show/api/articles",
			{
				headers: {
					Authorization: `Token ${token}`,
				},
				data: {
					article: {
						title: title,
						description: description,
						body: body,
						tagList: tagList,
					},
				},
			},
		);

		expect(
			response.ok(),
			`API should successfully create the article. Status: ${response.status()}`,
		).toBeTruthy();
		return await response.json();
	}

	async deleteArticle(slug: string, token: string) {
		const response = await this.request.delete(
			`https://api.realworld.show/api/articles/${slug}`,
			{
				headers: {
					Authorization: `Token ${token}`,
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
