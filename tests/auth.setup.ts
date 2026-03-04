import { test as setup } from "../fixtures/test-base";

const authFile = "playwright/.auth/user.json";

setup("Authenticate and save state", async ({ page, authHelper }) => {
	const email = process.env.TEST_USER_EMAIL!;
	const password = process.env.TEST_USER_PASSWORD!;
	const token = await authHelper.loginAndGetToken(email, password);
	await authHelper.injectToken(page, token);
	await page.context().storageState({ path: authFile });
});
