import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { IncomePage } from '../pages/IncomePage';

test.describe('Income Category Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('TC-011: ควรมีเมนูแบบดรอปดาวน์สำหรับเลือกหมวดหมู่', async ({ page }) => {
    const incomePage = new IncomePage(page);
    
    // Navigate to income
    await incomePage.navigateToIncome();
    
    // Click record income button
    await incomePage.clickRecordIncomeButton();
    
    // Get available categories
    const categories = await incomePage.getCategoryOptions();
    
    // Should have at least 2 categories
    expect(categories.length).toBeGreaterThan(1);
  });

  test('TC-012: ควรสามารถเลือกตัวเลือกหมวดหมู่ได้', async ({ page }) => {
    const incomePage = new IncomePage(page);
    
    // Navigate to income
    await incomePage.navigateToIncome();
    
    // Click record income button
    await incomePage.clickRecordIncomeButton();
    
    // Select category 2
    await incomePage.selectCategory('2');
    
    // Verify selection (can check by continuing to next step or other means)
    // Proceed to verify by trying to submit
    await incomePage.submitIncomeForm();
  });

  test('TC-013: ควรสามารถเลือกตัวเลือกหมวดหมู่ที่แตกต่างกันได้', async ({ page }) => {
    const incomePage = new IncomePage(page);
    
    // Navigate to income
    await incomePage.navigateToIncome();
    
    // Click record income button
    await incomePage.clickRecordIncomeButton();
    
    // Test selecting category 16
    await incomePage.selectCategory('16');
    
    // Verify selection by attempting navigation
    await page.waitForLoadState('networkidle');
  });
});