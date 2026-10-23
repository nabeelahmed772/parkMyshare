const { test, expect } = require('@playwright/test');
const VehiclePage = require('../../pages/vehicle');

// 3. Assert the response status is 200


test.describe('Vehicle Tests', () => {
  let vehiclePage;

test.beforeEach(async ({ page }) => {
    vehiclePage = new VehiclePage(page);
    await page.goto('/');
    await expect(page).toHaveURL(/vehicle/);
  });

test('create new vehicle', async ({}) => {
  await vehiclePage.goToCreateVehicle();
  await vehiclePage.createNewVehicle(
    `new vehicle name ${Math.random()}`,
    `wewr3-${Math.random()}`
  );

});

test('update a vehicle', async ({}) => {
  await vehiclePage.updateVehicle('new vehicle name');
});


test('create another  vehicle', async ({page}) => {
  
  

    await vehiclePage.goToCreateVehicle();
    await vehiclePage.createNewVehicle(
        `new vehicle name ${Math.random()}`,
        `wewr3-${Math.random()}`
    );
    await page.pause();
    await vehiclePage.createAnotherVehicle();
});


test('delete a vehicle', async ({}) => {
   
    await vehiclePage.deleteVehicle('new vehicle name');
});


test('activate a vehicle', async ({}) => {
    await vehiclePage.activateVehicle('new vehicle name');
});

test('add unlimited monthly pass to a vehicle', async ({}) => {
 
    await vehiclePage.addUnlimitedMonthlyPass('new vehicle name');
});

test('extra tag ordering',  async ({page}) => {
  //await page.pause();
  await vehiclePage.tagorderding();
});

test('license update ',  async ({}) => {
  await vehiclePage.licenseUpdate('new vehicle name');
});

});

  