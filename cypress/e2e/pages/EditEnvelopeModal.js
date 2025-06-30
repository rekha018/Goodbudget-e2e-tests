class EditEnvelopeModal {
  // Selector for the Amount field
  get #amountField() {
    return cy.get('.cell-content > input.amount').first();
  }

  get #saveChangesButton() {
    return cy.get('#save-envelopes-btn');
  }

  changeAmount(newAmount) {
    this.#amountField.clear().type(newAmount);
  }

  saveChanges() {
    this.#saveChangesButton.click();
  }

  getCurrentAmount() {
    return this.#amountField.invoke('val');
  }
}

export default new EditEnvelopeModal();