import { Page, Locator } from "@playwright/test";

export class ArticlePage {
	readonly page: Page;
	readonly titleInput: Locator;
	readonly descriptionInput: Locator;
	readonly bodyInput: Locator;
	readonly tagsInput: Locator;
	readonly publishButton: Locator;
	readonly deleteArticleButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.titleInput = page.getByPlaceholder("Article Title");
		this.descriptionInput = page.getByPlaceholder("What's this article about?");
		this.bodyInput = page.getByPlaceholder("Write your article (in markdown)");
		this.tagsInput = page.getByPlaceholder("Enter tags");
		this.publishButton = page.getByRole("button", { name: "Publish Article" });
		this.deleteArticleButton = page
			.getByRole("button", { name: "Delete Article" })
			.first();
	}

	async gotoEditor() {
		await this.page.goto("/editor");
	}

	async createArticle(
		title: string,
		description: string,
		body: string,
		tags: string,
	) {
		await this.titleInput.fill(title);
		await this.descriptionInput.fill(description);
		await this.bodyInput.fill(body);
		await this.tagsInput.fill(tags);
		await this.tagsInput.press("Enter");
		await this.publishButton.click();
	}

	async deleteArticle() {
		await this.deleteArticleButton.click();
	}
}
