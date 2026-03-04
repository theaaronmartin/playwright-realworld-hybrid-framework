import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
	readonly page: Page;
	readonly globalFeedTab: Locator;
	readonly yourFeedTab: Locator;

	constructor(page: Page) {
		this.page = page;
		this.globalFeedTab = page.getByRole("link", { name: "Global Feed" });
		this.yourFeedTab = page.getByRole("link", { name: "Your Feed" });
	}

	async goto() {
		await this.page.goto("/");
	}

	async verifyGlobalFeedIsVisible() {
		await expect(this.globalFeedTab).toBeVisible();
	}
}
