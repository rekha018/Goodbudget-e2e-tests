# [Goodbudget-e2e-tests]

[![Cypress Tests](https://img.shields.io/badge/tests-Cypress-brightgreen)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Table of Contents
- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Handling Credentials](#handling-credentials)
  - [Installation](#installation)
- [Usage](#usage)
- [Page Object Model](#page-object-model-pom)
- [Key Features & Utilities](#key-features--utilities)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the Project

This project contains a suite of End-to-End (E2E) tests written using **Cypress.io** and **JavaScript** using [Page Object Model](#page-object-model-pom). 
It is designed to test critical useacses like,
* Add a Transaction to an Envelope
* Change the amount of an envelope
* Login flow

The tests focus on simulating real user interactions to ensure a robust and reliable user experience across various scenarios, including handling dynamic content, form submissions, and data validations.

### Built With

* [Cypress](https://www.cypress.io/) - Fast, easy, and reliable testing for anything that runs in a browser.
* [JavaScript] - The primary language for writing tests.
* [Node.js] - JavaScript runtime environment for running Cypress.
* [npm] or [Yarn] - Package manager for project dependencies.
* [cypress-xpath] - Element finder using xpath.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on machine:
* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rekha018/Goodbudget-e2e-tests.git
    cd Goodbudget-e2e-tests
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Handling Credentials

To ensure the security of sensitive information like test usernames, passwords, or API keys, this project utilizes **environment variables** stored in a `.env` file. This standard practice prevents credentials from being hardcoded into the codebase or exposed in version control systems like Git.

**Secure Credential Management with .env:**

1.  **The `.env` File:**
    * This is a plain text file named `.env` located in the root directory of the project.
    * It contains key-value pairs, where each key represents an environment variable and its corresponding value is the sensitive data.
    * **Crucially, the `.env` file is NOT committed to Git.** This is enforced by an entry in the `.gitignore` file, ensuring your credentials remain local and private.

2.  **Example `.env.example`:**
    * For clarity and to guide other developers, an example file named `.env.example` (or `.env.sample`) is provided and *is* committed to Git. This file contains placeholder values for all required environment variables, indicating what needs to be set up in a local `.env` file.
    * **Your `.env` file should mirror the structure of `.env.example` but with your actual credentials.**

3.  **Cypress Integration:**
    * Cypress has built-in support for environment variables. When you run Cypress tests, it automatically loads variables from your `.env` file that are **prefixed with `CYPRESS_`**.
    * For instance, if your `.env` contains `API_USERNAME=testuser`, Cypress makes `testuser` available within your tests.
    * This approach ensures the tests are flexible and don't expose sensitive information.

## Usage

Once installed, you can run the Cypress tests in various ways:

* **Open Cypress Test Runner (interactive mode):**
    ```bash
    npm run cypress:open
    # or
    yarn cypress:open
    ```
    This will open the Cypress UI, where you can select and run individual spec files.

* **Run all tests headless (from the command line):**
    ```bash
    npm run cypress:run
    # or
    yarn cypress:run
    ```
    This will run all tests in the configured browser (default: Electron) without opening the UI and generate a video and screenshots (if enabled on failure).

* **Run specific tests (headless):**
    ```bash
    npm run cypress:run -- --spec "cypress/e2e/goodbudget.cy.js"
    # or
    yarn cypress:run --spec "cypress/e2e/goodbudget.cy,js"
    ```

* **Run tests against a specific base URL:**
    ```bash
    npm run cypress:run -- --config baseUrl=http://localhost:8080
    # or
    yarn cypress:run --config baseUrl=http://localhost:8080
    ```

## Page Object Model (POM)

This project follows the **Page Object Model (POM)** design pattern to enhance the maintainability, readability, and reusability of the Cypress tests.

### What is the Page Object Model?

The Page Object Model is an object-oriented design pattern for test automation in which web pages are represented as classes, and the elements on those web pages are represented as variables within the class. Actions that can be performed on the page (like clicking buttons, typing text) are represented as methods of the class.

### Benefits of Using POM:

* **Readability:** Tests become more human-readable, as they interact with "pages" and "actions" rather than raw CSS selectors.
* **Maintainability:** If the UI of a page changes, you only need to update the selector or interaction logic in one place (within the respective Page Object class) rather than across multiple test files.
* **Reusability:** Page Objects and their methods can be reused across different test scenarios, reducing code duplication.

### Implementation in This Project

In this project, Page Object classes are typically located in the `cypress/pages` directory (you might need to create this directory if it doesn't exist). Each significant page or component of the application has its own dedicated Page Object file.

**Example Page Object (`cypress/pages/LoginPage.js`):**

```javascript
// cypress/pages/LoginPage.js
class LoginPage {
  get usernameInput() {
    return cy.get('#username-input');
  }

  get passwordInput() {
    return cy.get('#password-input');
  }

  get loginButton() {
    return cy.get('button[type="submit"]');
  }

  visit() {
    cy.visit('/login');
  }

  login(username, password) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }
}

export default new LoginPage(); // Export an instance of the page object
```

## Key Features & Utilities

This project leverages various Cypress features and includes custom utilities for robust testing:

* **Robust Element Selection:** Utilizes `cy.get()`, `cy.contains()`, `.filter()`, and `.eq()` for precise DOM element targeting.
    * Example: `cy.get('.items-list li').filter('.active').should('have.length', 3);`
    * Example: `cy.get('li').contains(/^Banana$/).should('have.text', 'Banana');`
* **Dynamic Value Handling:** Strategies for extracting and validating text content from elements, including:
    * Using `invoke('text')` to get raw text.
    * `parseFloat()` for converting text to numbers (e.g., prices, quantities).
    * Handling numbers with thousands separators (e.g., `text.replace(/,/g, '')`).
    * Converting numbers to specific decimal formats (e.g., `number.toFixed(2)`).
    * Example: `cy.get('#price').invoke('text').then(t => parseFloat(t.replace(/,/g,''))).should('eq', 1234.56);`
* **Retryability & Assertions:** Comprehensive use of `cy.should()` for automatic retries, ensuring tests are stable against asynchronous UI updates.
    * Asserting element presence, visibility, and text content.
    * Numerical comparisons (e.g., `to.equal`, `to.be.above`, `to.be.closeTo`).
    * Checking for non-zero collections: `cy.get('selector').should('have.length.above', 0);`
* **Custom Commands (`cypress/support/commands.js`):** Includes custom commands to encapsulate complex or repetitive test logic, such as:
    * **`cy.login()`:** A robust command for logging into the portal
        ```javascript
        // Example usage:
        cy.login();
        ```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Contact
Rekha Biradar - [https://github.com/rekha018](https://github.com/rekha018)

Project Link: [https://github.com/rekha018/Goodbudget-e2e-tests.git](https://github.com/rekha018/Goodbudget-e2e-tests.git)

## Acknowledgements

* [Cypress Documentation](https://docs.cypress.io/)