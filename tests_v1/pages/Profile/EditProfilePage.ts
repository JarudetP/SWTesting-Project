// tests_v1/pages/EditProfilePage.ts
import { Page } from '@playwright/test';

/**
 * Edit Profile Page Object Model - for editing user profile
 */
export class EditProfilePage {
  constructor(private page: Page) {}

  async clickProfileMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'โปรไฟล์' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEditProfileButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'แก้ไขโปรไฟล์' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillDisplayName(displayName: string): Promise<void> {
    await this.page.locator('input[name="display_name"]').fill(displayName);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.locator('input[name="first_name"]').fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.locator('input[name="last_name"]').fill(lastName);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.page.locator('input[name="phone"]').fill(phone);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกข้อมูล' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickOkButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'OK' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async editProfile(profileData: {
    displayName: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<void> {
    await this.clickEditProfileButton();
    await this.fillDisplayName(profileData.displayName);
    await this.fillFirstName(profileData.firstName);
    await this.fillLastName(profileData.lastName);
    await this.fillPhone(profileData.phone);
    await this.clickSaveButton();
    await this.clickOkButton();
  }
}
