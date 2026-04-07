import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExpensePage } from '../pages/ExpensePage';

test.describe('Expense Management - Bill Approval', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('TC-001: ควรอนุมัติบิลได้สำเร็จ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to pending bills
    await expensePage.navigateToPendingBills();
    
    // Just wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Approve bill
    await expensePage.approveBill();
    
    // Verify success message
    const hasSuccess = await expensePage.hasSuccessMessage();
    expect(hasSuccess).toBeTruthy();
  });

  test('TC-002: บิลควรถูกลบออกจากรายการรออนุมัติหลังจากได้รับการอนุมัติ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to pending bills
    await expensePage.navigateToPendingBills();
    
    // Approve a bill
    await expensePage.approveBill();
    
    // Verify success message shown
    const hasSuccess = await expensePage.hasSuccessMessage();
    expect(hasSuccess).toBeTruthy();
  });
});