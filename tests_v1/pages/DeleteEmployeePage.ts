// tests_v1/pages/DeleteEmployeePage.ts
import { Page } from '@playwright/test';

/**
 * Delete Employee Page Object Model - for deleting employees in Balloon module
 */
export class DeleteEmployeePage {
  constructor(private page: Page) {}

  async clickEmployeeMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'พนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async deleteEmployeeByName(firstName: string, lastName: string): Promise<void> {
    // Find the employee list item that contains both first and last name
    const fullName = `${firstName} ${lastName}`;
    const employeeCard = this.page.locator('div').filter({ hasText: fullName }).first();
    
    // Find delete button within that employee card
    // Get the parent container and find the delete button
    const deleteButton = employeeCard.locator('button[aria-label*="delete"], button[title*="ลบ"], svg[class*="trash"]').first();
    await deleteButton.click();
    await this.page.waitForLoadState('networkidle');
    
    // Confirm deletion
    await this.confirmDeleteButton();
  }

  async confirmDeleteButton(): Promise<void> {
    // Wait for confirmation button to be visible
    await this.page.getByRole('button', { name: 'ยืนยันการลบ' }).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.getByRole('button', { name: 'ยืนยันการลบ' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
