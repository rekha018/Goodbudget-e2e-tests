import LoginPage from '../e2e/pages/LoginPage';
import CommonElements from '../e2e/pages/CommonElements';

Cypress.Commands.add('login', () => {
    LoginPage.visit();
    LoginPage.login(Cypress.env('API_USERNAME'), Cypress.env('API_PASSWORD'));
    cy.url().should('include', '/home');
});