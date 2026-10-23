const { expect } = require('@playwright/test');

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profileLink = page.getByRole('link', { name: 'person Nabeel host' });
    this.profileTab = page.getByRole('link', { name: 'Profile' });
    this.companyCreditCardsButton = page.getByRole('button', { name: 'Company Credit Cards' });
    this.addCardButton = page.getByRole('button', { name: 'Add Card' });
    this.cardNumberLabel = page.getByText('Card Number (ex: XXXX XXXX');
    this.cardNumberInput = page.getByRole('textbox', { name: 'Card Number (ex: XXXX XXXX' });
    this.expirationInput = page.getByRole('textbox', { name: 'Expiration' });
    this.cvvInput = page.getByRole('textbox', { name: 'CVV' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cardOrderButton = page.getByRole('button', { name: 'swap_vert' });
    this.deleteCardButton = page.getByRole('button', { name: 'delete' });
  }

  async goToCompanyCreditCards() {
    await this.profileLink.click();
    await this.profileTab.click();
    await this.companyCreditCardsButton.click();
  }

  async addCompanyCreditCard(cardNumber, expirationYear, expirationMonth, cvv) {
    await this.addCardButton.click();
    await this.cardNumberLabel.click();
    await this.cardNumberInput.click();
    await this.cardNumberInput.fill(cardNumber);
    await this.cardNumberInput.click();
    await this.expirationInput.click();
    await this.page.getByRole('button', { name: expirationYear }).click();
    await this.page.getByRole('button', { name: expirationMonth }).click();
    await this.cvvInput.click();
    await this.cvvInput.fill(cvv);
    await this.saveButton.click();
    await expect(this.page.getByText('Card added successfully!')).toBeVisible();
  }

  async deleteCompanyCreditCard() {
    await this.cardOrderButton.click();
    await this.cardOrderButton.click();
    await this.deleteCardButton.click();
    await expect(this.page.getByText('Card is removed successfully!')).toBeVisible();
  }
}

module.exports = ProfilePage;
