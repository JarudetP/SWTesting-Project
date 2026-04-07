// tests_v1/pages/LoginPage.ts
import { Page } from '@playwright/test';

/**
 * Login Page Object Model
 */
export class LoginPage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('http://147.50.253.67:3002/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string): Promise<void> {
    // Fill username
    await this.page.getByRole('textbox', { name: 'กรอกไอดีของคุณ' }).click();
    await this.page.getByRole('textbox', { name: 'กรอกไอดีของคุณ' }).fill(username);
    
    // Fill password
    await this.page.getByRole('textbox', { name: '••••••••' }).click();
    await this.page.getByRole('textbox', { name: '••••••••' }).fill(password);
    
    // Click login button
    await this.page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    
    // Wait for navigation
    await this.page.waitForLoadState('networkidle');
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'เข้าสู่ระบบ' }).isVisible();
  }

  async hasErrorMessage(): Promise<boolean> {
    try {
      await this.page.locator('[class*="error"], [role="alert"]').first().waitFor({ timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }
}
