// cypress/pages/AddTransactionModal.js
class AddTransactionModal {
    get #dateField() {
        return cy.get('#expense-date');
    }

    get #payeeField() {
        return cy.get('#expense-receiver');
    }

    get #amountField() {
        return cy.get('#expense-amount');
    }

    get #envelopeDropdown() {
        return cy.get('.controls.envelope').find('select.span5.required.preventDebt');
    }

    get #accountDropdown() {
        return cy.get('div#expense-account-text').next('select').first();
    }

    get #saveButton() {
        return cy.get('#addTransactionSave');
    }

    fillDate(dateString) {
        cy.enterDateAndRetry(cy.get('#expense-date'), dateString);
        cy.get('body').click(0, 0);
    }

    fillPayee(payee) {
        this.#payeeField.type(payee);
        cy.get('body').click(0, 0);
    }

    fillAmount(amount) {
        this.#amountField.type(amount);
        cy.get('body').click(0, 0);
    }

    selectEnvelope(envelopeName) {
        this.#envelopeDropdown.select(2);
    }

    selectAccount(accountName) {
        this.#accountDropdown.select(1);
    }

    saveTransaction() {
        this.#saveButton.click();
    }
}

export default new AddTransactionModal();