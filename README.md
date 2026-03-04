# Playwright API & UI Hybrid Automation Framework

An enterprise-grade, end-to-end testing framework built with [Playwright](https://playwright.dev/) and TypeScript. This repository demonstrates advanced automation architectures by testing the [Conduit RealWorld App](https://demo.realworld.show/) (a Medium.com clone).

## 🏗️ Architectural Highlights

This framework was deliberately designed to showcase modern SDET best practices, moving beyond basic UI clicking to prioritize execution speed, stability, and maintainability.

* **Hybrid UI/API Testing:** Uses Playwright's `APIRequestContext` to bypass UI login screens, injecting JWT tokens directly into the browser's Local Storage for lightning-fast test setup.
* **Global Authentication State:** Leverages Playwright's project dependencies to log in exactly *once* via API before the test suite begins, saving the authenticated browser state and reusing it across all tests.
* **API Test Data Management (TDM):** Utilizes `test.afterEach` hooks to silently clean up test data (like created articles) via backend API `DELETE` requests, ensuring a clean database without slowing down UI execution.
* **Strict Page Object Model (POM):** Completely separates element locators and page actions from test assertions.
* **Custom Fixtures:** Extends Playwright's base test object to automatically instantiate and inject Page Objects and API Helpers into tests, adhering to the DRY (Don't Repeat Yourself) principle.
* **CI/CD Integration:** Includes a fully configured GitHub Actions workflow (`.github/workflows/playwright.yml`) to automatically execute the test suite on every push and pull request.

## 🛠️ Tech Stack

* **Core:** Playwright, TypeScript, Node.js
* **Pattern:** Page Object Model (POM)
* **Configuration:** `dotenv` for secure environment variable management
* **CI/CD:** GitHub Actions

## 📂 Project Structure

```plaintext
├── api/                  # API helpers for auth and test data management
├── fixtures/             # Custom Playwright fixtures for dependency injection
├── pages/                # Page Object Model classes (UI locators & actions)
├── tests/                # Test specs (UI, API, and Hybrid scenarios)
├── .github/workflows/    # CI/CD pipeline configuration
├── playwright.config.ts  # Global Playwright runner configuration
└── .env                  # (Local only) Secure credentials
```

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/playwright-realworld-hybrid-framework.git
cd playwright-realworld-hybrid-framework
npm install
npx playwright install --with-deps
```

### 2. Environment Setup

Create a `.env` file in the root directory and add your Conduit test credentials:

```env
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_secure_password
```

*(Note: You can register a free account manually at https://demo.realworld.show/)*

### 3. Run the Tests

Execute the entire test suite in headless mode:

```bash
npx playwright test
```

Run tests with the Playwright UI (great for debugging):

```bash
npx playwright test --ui
```

### 4. View the Report

After a test run, view the generated HTML report:

```bash
npx playwright show-report
```
