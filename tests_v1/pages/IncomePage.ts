// tests_v1/pages/IncomePage.ts
import { Page } from '@playwright/test';

/**
 * Income Page Object Model
 */
export class IncomePage {
  constructor(private page: Page) {}

  async navigateToIncome(): Promise<void> {
    await this.page.getByRole('button', { name: 'รายรับ' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickRecordIncomeButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกรายรับ' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectCategory(categoryValue: string): Promise<void> {
    await this.page.getByRole('combobox').selectOption(categoryValue);
    await this.page.waitForLoadState('networkidle');
  }

  async enterAmount(amount: string): Promise<void> {
    await this.page.getByPlaceholder('0.00').click();
    await this.page.getByPlaceholder('0.00').fill(amount);
  }

  async enterCheckDate(date: string): Promise<void> {
    await this.page.locator('input[name="check_date"]').fill(date);
  }

  async enterTransferDate(date: string): Promise<void> {
    await this.page.locator('input[name="transfer_date"]').fill(date);
  }

  async submitIncomeForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกข้อมูลรายรับ' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async recordIncome(data: {
    category?: string;
    amount?: string;
    checkDate?: string;
    transferDate?: string;
  } = {}): Promise<void> {
    const {
      category = '2',
      amount = '10000',
      checkDate = '2026-04-29',
      transferDate = '2026-05-08'
    } = data;

    await this.navigateToIncome();
    await this.clickRecordIncomeButton();
    await this.selectCategory(category);
    await this.enterAmount(amount);
    await this.enterCheckDate(checkDate);
    await this.enterTransferDate(transferDate);
    await this.submitIncomeForm();
  }

  async hasSuccessMessage(): Promise<boolean> {
    try {
      await this.page.locator('[class*="success"], [role="alert"]').first().waitFor({ timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async hasErrorMessage(): Promise<boolean> {
    try {
      await this.page.locator('[class*="error"], [role="alert"]').first().waitFor({ timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async getCategoryOptions(): Promise<string[]> {
    const combobox = this.page.getByRole('combobox');
    const options = await combobox.locator('option').allTextContents();
    return options;
  }
}
