import { APIRequestContext, Page, expect } from "@playwright/test";

export class AuthHelper {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async loginAndGetToken(email: string, password: string): Promise<string> {
		const response = await this.request.post(
			"https://api.realworld.show/api/users/login",
			{
				data: {
					user: {
						email: email,
						password: password,
					},
				},
			},
		);

		if (!response.ok()) {
			console.error(`API Login Failed with Status: ${response.status()}`);
			console.error("Response Body:", await response.text());
		}

		expect(
			response.ok(),
			"API Login request should return a 200 OK status",
		).toBeTruthy();

		const responseBody = await response.json();
		return responseBody.user.token;
	}

	async injectToken(page: Page, token: string) {
		await page.goto("/");

		await page.evaluate((jwt) => {
			window.localStorage.setItem("jwtToken", jwt);
		}, token);
		await page.reload();
	}
}
