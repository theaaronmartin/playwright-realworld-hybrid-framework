import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ArticlePage } from "../pages/ArticlePage";
import { AuthHelper } from "../api/AuthHelper";
import { ArticleHelper } from "../api/ArticleHelper";

type MyFixtures = {
	homePage: HomePage;
	loginPage: LoginPage;
	articlePage: ArticlePage;
	authHelper: AuthHelper;
	articleHelper: ArticleHelper;
};

export const test = base.extend<MyFixtures>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	articlePage: async ({ page }, use) => {
		await use(new ArticlePage(page));
	},
	authHelper: async ({ request }, use) => {
		await use(new AuthHelper(request));
	},
	articleHelper: async ({ request }, use) => {
		await use(new ArticleHelper(request));
	},
});

export { expect } from "@playwright/test";
