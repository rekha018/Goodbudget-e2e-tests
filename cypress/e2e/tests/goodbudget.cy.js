import LoginPage from '../pages/LoginPage';
import CommonElements from '../pages/CommonElements';
import DashboardPage from '../pages/DashboardPage';
import AddTransactionModal from '../pages/AddTransactionModal';
import EditEnvelopeModal from '../pages/EditEnvelopeModal';

describe('Goodbudget Transaction Management', () => {
    beforeEach(() => {
        cy.login()
    });

    it('should successfully add a transaction', () => {
        const transactionData = {
            payee: 'Test Transaction Payee',
            amount: 50.00,
            envelope: 'Groceries',
        };

        // 1. Click "Add Transaction"
        CommonElements.clickAddTransaction();

        // 2. Fill in Payee, Amount, Envelope, Account
        AddTransactionModal.fillPayee(transactionData.payee);
        AddTransactionModal.fillAmount(transactionData.amount);
        AddTransactionModal.selectEnvelope(transactionData.envelope);
        AddTransactionModal.selectAccount(transactionData.account);

        // 3. Click Save
        AddTransactionModal.saveTransaction();

        // 4. Verify Transaction Appears in History
        DashboardPage.transactionAppearsInHistory(transactionData.payee, transactionData.amount);
    });

    it('should successfully change the amount of an envelope', () => {
        const envelopeName = 'Groceries';
        const amountToAdd = 100.00;

        let initialEnvelopeAmount;

        // 1. Get the initial amount from the envelope's display on the dashboard
        DashboardPage.openGroceries()
        DashboardPage.getCurrentBalanceAmount().then((currentAmount) => {
            initialEnvelopeAmount = parseFloat(currentAmount);

            // 2. Open the Edit Envelope modal for 'Groceries'
            CommonElements.navigateToEditEnvelope();

            // 3. Change the amount value
            cy.log(`Initial amount for ${envelopeName}: ${initialEnvelopeAmount}`);
            const targetAmount = initialEnvelopeAmount + amountToAdd;
            cy.log(`target amount: ${targetAmount}`);
            EditEnvelopeModal.changeAmount(targetAmount);

            // 4. Click Save
            EditEnvelopeModal.saveChanges();

            // 5. Verify Updated Groceries amount appears in Envelopes/Dashboard
            DashboardPage.openGroceries()

            DashboardPage.getCurrentBalanceAmount().then((amount) => {
                const tolerance = 0.000001;
                expect(Math.abs(parseFloat(amount) - targetAmount)).to.be.lessThan(tolerance);
            });

        });
    });

    it('should display an error for invalid login credentials', () => {
        LoginPage.visit();
        LoginPage.login('invalid@example.com', 'wrongpassword');
        LoginPage.getErrorMessage().should('be.visible').and('contain', "Hm... that username and/or password didn't work.");
    });

});