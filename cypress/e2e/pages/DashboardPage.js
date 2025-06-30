class DashboardPage {
    get #transactionHistory() {
        return cy.get('table.table.table-transactions.floatThead-table');
    }

    get #totalAmountField() {
        return cy.get('div.right strong:nth-of-type(1)').first();
    }

    get #groceriesField() {
        return cy.xpath('//strong[normalize-space()="Groceries"]').first();
    }

    get #balanceAmountField() {
        return cy.get('.trans-amount p:nth-child(2)');
    }

    transactionAppearsInHistory(payee, amount) {
        this.#transactionHistory.should('be.visible');

        cy.log(`Initial amount : ${amount}`);
        cy.get('th.payee strong')
            .filter((index, el) => {
                return Cypress.$(el).text().trim() === payee;
            })
            .should('have.length.above', 0);

        cy.get('td strong')
            .filter((index, el) => {
                return parseFloat(Cypress.$(el).text().trim()) === amount;
            })
            .should('have.length.above', 0);
    }

    getCurrentBalanceAmount() {
        return this.#balanceAmountField.invoke('text');
    }

    getTotalAmount() {
        return this.#totalAmountField.invoke('text');
    }

    getTotalAmountField() {
        return this.#totalAmountField;
    }

    openGroceries() {
        this.#groceriesField.click();
    }
}

export default new DashboardPage();