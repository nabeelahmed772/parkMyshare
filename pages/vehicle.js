const { expect } = require('@playwright/test');

class VehiclePage {
  constructor(page) {
    this.page = page;
    this.addVehicleButton = page.getByRole('button', { name: 'add Vehicle' });
    this.vehicleNameInput = page.getByRole('textbox', { name: 'Vehicle Name' });
    this.licensePlateInput = page.getByRole('textbox', { name: 'License Plate #' });
    this.licensePlateStateCombobox = page.getByRole('combobox', { name: 'License Plate State' });
    this.licensePlateStateListbox = page.getByRole('listbox', { name: 'License Plate State' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.addAnotherVehicleButton = page.getByRole('button', { name: 'Add Another Vehicle' });
    this.searchBox = page.getByRole('searchbox', { name: 'search' });
    this.actionsButton = page.getByRole('button', { name: 'Actions' }).last();
    this.deleteVehicleButton = page.getByRole('button', { name: 'Delete Vehicle' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, delete' });
    this.editViewVehicleButton = page.getByRole('button', { name: 'Edit/View Vehicle' });
    this.activateVehicleButton = page.getByRole('button', { name: 'Activate Vehicle' });
    this.availableFacilityButton = page.locator("//div[contains(@class, 'facility-card') and not(contains(@class, 'facility-card--sold-out'))]//button[contains(@class, 'btn-select-facility')]");
    this.checkbox = page.getByRole('checkbox');
    this.addUnlimitedMonthlyPassButton = page.getByRole('button', { name: 'Add Unlimited Monthly Pass' });
    this.facilityCombobox = page.getByRole('combobox', { name: 'Select facility' });
    this.facilityOption = page.getByText('Los Angeles, The Parking Spot (Century) - Main, $135.00/Month');
    this.extraTagOrderingButton = page.getByRole('button', { name: 'Extra Tag Ordering' });
    this.shippingOptionText = page.getByText('Select shipping option');
    this.shippingOptionListbox = page.getByRole('listbox', { name: 'Select shipping option' });
    this.windshieldQuantityInput = page.getByRole('row', { name: 'Windshield $' }).getByRole('spinbutton');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.vehicleSavedMessage = page.getByText('Vehicle saved successfully.');
    this.vehicleDeletedMessage = page.getByText('Vehicle is deleted');
    this.vehicleUpdatedMessage = page.getByText('Vehicle is updated.');
    this.licenseEdit = page.locator('button[title="Edit"]').last();
    this.savelicense = page.locator('button[title="Save"]').last();
    this.licenseUpdateMessage = page.getByText('License plate updated successfully');
    // const mainContent = page.locator('.main-content:visible').last();
    // this.firstimageupload = mainContent.locator('.fileinput input').first();
    // this.lastimageupload = mainContent.locator('.fileinput input').last();
    this.replaceimage = page.getByText('Replace Image').first();
  }

  async goToCreateVehicle() {
    await this.addVehicleButton.click();
  }

  async createNewVehicle(vehicleName, licensePlate) {
    await this.vehicleNameInput.fill(vehicleName);
    await this.licensePlateInput.fill(licensePlate);
    await this.licensePlateStateCombobox.click();
    await this.licensePlateStateListbox.click();
    await this.nextButton.click();
    // await this.firstimageupload.setInputFiles('test-data\\images.jpg');
    // await this.lastimageupload.setInputFiles('test-data\\images.jpg');
    // await expect(this.replaceimage).toBeVisible();
    await this.saveButton.click();
    await expect(this.vehicleSavedMessage).toBeVisible();
  }

  async createAnotherVehicle() {
    await this.addAnotherVehicleButton.click();
    await this.createNewVehicle(
      `new vehicle name ${Math.random()}`,
      `wewr3-${Math.random()}`
    );
  }

  async findVehicleAndOpenActions(vehicleName) {
    await this.searchBox.click();
    await this.searchBox.fill(vehicleName);
    await this.page.waitForTimeout(2000);
    await this.actionsButton.click({ force: true });
    await this.page.waitForTimeout(1000);
  }

  async deleteVehicle(vehicleName) {
    await this.findVehicleAndOpenActions(vehicleName);
    await this.deleteVehicleButton.click();
    await this.confirmDeleteButton.click();
    await expect(this.vehicleDeletedMessage).toBeVisible();
  }

  async updateVehicle(vehicleName) {
    await this.findVehicleAndOpenActions(vehicleName);
    await this.editViewVehicleButton.click();
    await this.saveButton.click();
    await expect(this.vehicleUpdatedMessage).toBeVisible();
  }

  async activateVehicle(vehicleName) {
    await this.findVehicleAndOpenActions(vehicleName);
    await this.activateVehicleButton.click();
    await this.availableFacilityButton.first().click();
    await this.nextButton.click();
    await this.page.waitForTimeout(3000);
    await this.nextButton.click();
    await this.checkbox.check();

    const [response] = await Promise.all([
      this.page.waitForResponse(response => response.url().includes('product/subscriptions-with-addons')),
      this.activateVehicleButton.click()
    ]);
    expect(response.status()).toBe(200);
  }

  async addUnlimitedMonthlyPass(vehicleName) {
    await this.findVehicleAndOpenActions(vehicleName);
    await this.addUnlimitedMonthlyPassButton.click();
    await this.facilityCombobox.click();
    await this.facilityOption.click();
    await this.nextButton.click();
    await this.saveButton.click();
  }

  async tagorderding() {
    await this.extraTagOrderingButton.click();
    await this.shippingOptionText.click();
    await this.shippingOptionListbox.click();
    await this.windshieldQuantityInput.fill('1');
    await this.purchaseButton.click();
  }

  async licenseUpdate(vehicleName){
     await this.searchBox.click();
    await this.searchBox.fill(vehicleName);
    await this.page.waitForTimeout(2000);
    await this.licenseEdit.click({ force: true });
    await this.savelicense.click();
    await expect(this.licenseUpdateMessage).toBeVisible();
  }
}

module.exports = VehiclePage;