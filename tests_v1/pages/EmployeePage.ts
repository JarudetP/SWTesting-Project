// tests_v1/pages/EmployeePage.ts
import { Page } from '@playwright/test';

/**
 * Employee Page Object Model - for managing employees in a project
 */
export class EmployeePage {
  constructor(private page: Page) {}

  async clickAddEmployeeButton(): Promise<void> {
    await this.page.getByRole('button', { name: '+ เพิ่มคนงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async addEmployeeByName(employeeName: string): Promise<void> {
    // Find the employee in the list and click the add button
    await this.page
      .getByRole('listitem')
      .filter({ hasText: employeeName })
      .getByRole('button')
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  async addMultipleEmployees(employeeNames: string[]): Promise<void> {
    for (const name of employeeNames) {
      await this.clickAddEmployeeButton();
      await this.addEmployeeByName(name);
    }
  }

  async getEmployeeListItems(): Promise<string[]> {
    const items = await this.page.getByRole('listitem').all();
    const names: string[] = [];
    
    for (const item of items) {
      const text = await item.textContent();
      if (text) {
        names.push(text.trim());
      }
    }
    
    return names;
  }
}
