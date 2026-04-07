// tests_v1/pages/ExpensePage.ts
import { Page } from '@playwright/test';

/**
 * Expense (Bills) Page Object Model
 */
export class ExpensePage {
  private baseUrl = 'http://147.50.253.67:3002';

  constructor(private page: Page) {}

  async navigateToExpenses(): Promise<void> {
    await this.page.getByRole('button', { name: 'รวมจ่าย' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPendingBills(): Promise<void> {
    // Click menu buttons to navigate
    await this.page.getByRole('button', { name: 'รวมจ่าย' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'บิลรออนุมัติ' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToBillHistory(): Promise<void> {
    // Direct navigation using URL
    await this.page.goto(`${this.baseUrl}/expenses/history`);
    await this.page.waitForLoadState('networkidle');
  }

  async approveBill(): Promise<void> {
    // Click approve button (first bill)
    await this.page.getByRole('button', { name: 'อนุมัติบิล' }).first().click();
    await this.page.waitForLoadState('networkidle');
    
    // Click confirmation button
    await this.page.getByRole('button', { name: 'ใช่, อนุมัติเลย' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async rejectBill(): Promise<void> {
    // Wait for reject button to be visible and clickable
    await this.page.getByRole('button', { name: 'ปฏิเสธบิล' }).first().waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'ปฏิเสธบิล' }).first().click();
    await this.page.waitForLoadState('networkidle');
    
    // Wait for confirmation dialog and click confirm
    await this.page.getByRole('button', { name: 'ยืนยันการปฏิเสธ' }).waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'ยืนยันการปฏิเสธ' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterByStatus(status: string): Promise<void> {
    await this.page.getByRole('button', { name: status, exact: true }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPendingBillCount(): Promise<number> {
    await this.page.waitForLoadState('networkidle');
    
    // Try multiple selectors to find bill rows
    let count = 0;
    
    // Try 1: Table rows inside tbody
    count = await this.page.locator('tbody tr').count();
    if (count > 0) return count;
    
    // Try 2: ARIA rows (div with role="row")
    count = await this.page.locator('[role="row"]').count();
    if (count > 0) return count;
    
    // Try 3: Bill list items (divs with bill-related classes)
    count = await this.page.locator('[class*="bill-item"], [class*="bill-list"], [class*="invoice-row"]').count();
    if (count > 0) return count;
    
    // Try 4: Generic table cells
    count = await this.page.locator('tr td, [role="cell"]').count();
    if (count > 0) return count;
    
    return 0;
  }

  async isPendingBillsEmpty(): Promise<boolean> {
    const count = await this.getPendingBillCount();
    return count === 0;
  }

  async hasSuccessMessage(): Promise<boolean> {
    try {
      // Look for common success indicators
      const selectors = [
        'text=/ปฏิเสธ|สำเร็จ|ยืนยัน|complete/',
        '[class*="success"]',
        '[class*="alert-success"]',
        '[role="alert"]',
        '[class*="toast"]',
      ];
      
      for (const selector of selectors) {
        try {
          await this.page.locator(selector).first().waitFor({ timeout: 2000 });
          return true;
        } catch {
          continue;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  async waitForPendingBillsLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
