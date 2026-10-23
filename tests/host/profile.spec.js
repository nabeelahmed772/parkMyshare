const{test, expect} = require('@playwright/test');
const ProfilePage = require('../../pages/profile');

test.describe('Profile Tests', () => {
  let profilePage;  

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    page.goto('/');
  });

test('add company credit card', async ({}) => {

  await profilePage.goToCompanyCreditCards();
  await profilePage.addCompanyCreditCard('4111111111111111', '2028', 'February', '123');

});

test('delete company credit card', async ({}) => {
  await profilePage.goToCompanyCreditCards();
  await profilePage.deleteCompanyCreditCard();

})
})