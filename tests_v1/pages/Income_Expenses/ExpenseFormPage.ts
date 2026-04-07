// tests_v1/pages/ExpenseFormPage.ts
import { Page } from '@playwright/test';

/**
 * Expense Form Page Object Model - for adding bills
 */
export class ExpenseFormPage {
  constructor(private page: Page) {}

  async clickAddBillButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'เพิ่มบิลค่าใช้จ่าย' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectExpenseType(type: string): Promise<void> {
    await this.page.locator('select[name="expense_type"]').selectOption(type);
  }

  async fillExpenseDate(date: string): Promise<void> {
    await this.page.locator('input[name="expense_date"]').fill(date);
  }

  async fillAmount(amount: string): Promise<void> {
    await this.page.getByPlaceholder('0.00').fill(amount);
  }

  async fillStoreName(storeName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ชื่อร้านค้า' }).fill(storeName);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกข้อมูล' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async addBill(billData: {
    expenseType: string;
    date: string;
    amount: string;
    storeName: string;
  }): Promise<void> {
    await this.clickAddBillButton();
    await this.selectExpenseType(billData.expenseType);
    await this.fillExpenseDate(billData.date);
    await this.fillAmount(billData.amount);
    await this.fillStoreName(billData.storeName);
    await this.clickSaveButton();
  }
}
