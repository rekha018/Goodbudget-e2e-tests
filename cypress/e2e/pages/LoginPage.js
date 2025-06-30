class LoginPage {

  get #emailField() {
    return cy.get('#username');
  }

  get #passwordField() {
    return cy.get('#password');
  }

  get #loginButton() {
    return cy.get('form button[type="submit"]');
  }

  get #errorMessage() {
    return cy.get('label.error');
  }

  visit() {
    cy.visit('/login');
  }

  login(email, password) {
    this.#emailField.type(email);
    this.#passwordField.type(password);
    this.#loginButton.click();
  }

  getErrorMessage() {
    return this.#errorMessage;
  }
}

export default new LoginPage();