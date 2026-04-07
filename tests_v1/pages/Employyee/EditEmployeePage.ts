// tests_v1/pages/EditEmployeePage.ts
import { Page } from '@playwright/test';

/**
 * Edit Employee Page Object Model - for editing employee details in Balloon module
 */
export class EditEmployeePage {
  constructor(private page: Page) {}

  async clickEmployeeMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'พนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEditEmployeeButton(index: number = 6): Promise<void> {
    // Click edit icon for the employee at the specified index (default 6th employee)
    await this.page.locator(`div:nth-child(${index}) > .p-4 > .flex.flex-col > .p-2.text-gray-400.hover\\:text-blue-600`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ชื่อจริง' }).fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'นามสกุล' }).fill(lastName);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'เบอร์โทร' }).fill(phone);
  }

  async fillDailyWage(wage: string): Promise<void> {
    await this.page.getByRole('spinbutton', { name: 'ค่าแรงต่อวัน (บาท)' }).fill(wage);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกการเปลี่ยนแปลง' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async editEmployee(employeeData: {
    firstName: string;
    lastName: string;
    phone: string;
    dailyWage: string;
  }, employeeIndex?: number): Promise<void> {
    await this.clickEditEmployeeButton(employeeIndex);
    await this.fillFirstName(employeeData.firstName);
    await this.fillLastName(employeeData.lastName);
    await this.fillPhone(employeeData.phone);
    await this.fillDailyWage(employeeData.dailyWage);
    await this.clickSaveButton();
  }
}
