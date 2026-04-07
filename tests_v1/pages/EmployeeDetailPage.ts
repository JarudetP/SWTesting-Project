// tests_v1/pages/EmployeeDetailPage.ts
import { Page } from '@playwright/test';

/**
 * Employee Detail Page Object Model - for viewing employee details in Balloon module
 */
export class EmployeeDetailPage {
  constructor(private page: Page) {}

  async clickEmployeeMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'พนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async viewEmployeeByName(firstName: string, lastName: string): Promise<void> {
    const fullName = `${firstName} ${lastName}`;
    await this.page.getByText(fullName).click();
    await this.page.waitForLoadState('networkidle');
  }

  async viewEmployeeDetailByName(firstName: string, lastName: string): Promise<void> {
    await this.clickEmployeeMenu();
    await this.viewEmployeeByName(firstName, lastName);
  }

  async getEmployeeName(): Promise<string | null> {
    return await this.page.locator('h1, h2, [class*="name"]').first().textContent();
  }

  async getEmployeeInfo(): Promise<string | null> {
    return await this.page.content();
  }
}
