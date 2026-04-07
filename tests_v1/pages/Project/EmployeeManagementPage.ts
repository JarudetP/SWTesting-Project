// tests_v1/pages/EmployeeManagementPage.ts
import { Page } from '@playwright/test';

/**
 * Employee Management Page Object Model - for managing employees in Balloon module
 */
export class EmployeeManagementPage {
  constructor(private page: Page) {}

  async clickEmployeeMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'พนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddEmployeeButton(): Promise<void> {
    await this.page.getByRole('button', { name: '+ เพิ่มพนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.locator('input[name="first_name"]').fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.locator('input[name="last_name"]').fill(lastName);
  }

  async fillPosition(position: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'เช่น IT Support' }).fill(position);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.page.getByRole('textbox', { name: '098xxxxxxx' }).fill(phone);
  }

  async fillNationalId(nationalId: string): Promise<void> {
    await this.page.locator('input[name="national_id"]').fill(nationalId);
  }

  async fillWageGroup(wageGroup: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'เช่น 1' }).fill(wageGroup);
  }

  async fillDailyWage(dailyWage: string): Promise<void> {
    await this.page.getByRole('spinbutton').fill(dailyWage);
  }

  async fillHireDate(hireDate: string): Promise<void> {
    await this.page.locator('input[name="hire_date"]').fill(hireDate);
  }

  async selectAssignedSite(siteName: string): Promise<void> {
    await this.page.locator('select[name="assigned_site"]').selectOption(siteName);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึก' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async addNewEmployee(employeeData: {
    firstName: string;
    lastName: string;
    position: string;
    phone: string;
    nationalId: string;
    wageGroup: string;
    dailyWage: string;
    hireDate: string;
    assignedSite: string;
  }): Promise<void> {
    await this.clickAddEmployeeButton();
    await this.fillFirstName(employeeData.firstName);
    await this.fillLastName(employeeData.lastName);
    await this.fillPosition(employeeData.position);
    await this.fillPhone(employeeData.phone);
    await this.fillNationalId(employeeData.nationalId);
    await this.fillWageGroup(employeeData.wageGroup);
    await this.fillDailyWage(employeeData.dailyWage);
    await this.fillHireDate(employeeData.hireDate);
    await this.selectAssignedSite(employeeData.assignedSite);
    await this.clickSaveButton();
  }
}
