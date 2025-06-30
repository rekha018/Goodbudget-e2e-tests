class CommonElements {
  get #envelopesDashboardLink() {
    // This selector might need adjustment based on Goodbudget's actual HTML
    // Looking for a link that contains "Envelopes" or a specific data-testid
    return cy.contains('a', 'Envelopes').first();
  }

  get #addTransactionButton() {
    return cy.get('a.btn.addTransaction');
  }

  isAddTransationVisible() {
    this.#addTransactionButton.should('be.visible');
  }

  clickEnvelopesDashboard() {
    this.#envelopesDashboardLink.click();
    // Goodbudget often updates content without full page reload,
    // so we might wait for a specific element on the dashboard to appear
    cy.url().should('include', '/a/#/envelopes');
    cy.get('.envelope-list').should('be.visible');
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