class CommonElements {

  get #addTransactionButton() {
    return cy.get('a.btn.addTransaction');
  }

  navigateHome() {
    cy.visit('/home');
  }

  navigateToEditEnvelope() {
    cy.visit('/envelope/edit');
  }

  clickAddTransaction() {
    this.#addTransactionButton.click();
    cy.get('.modal-body').should('be.visible');
  }
}

export default new CommonElements();