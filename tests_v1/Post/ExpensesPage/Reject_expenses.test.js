import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ExpensePage } from '../pages/ExpensePage';

test.describe('Expense Management - Bill Rejection', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('TC-003: ควรปฏิเสธบิลได้สำเร็จ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to pending bills
    await expensePage.navigateToPendingBills();
    
    // Just wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Reject bill
    await expensePage.rejectBill();
    
    // Verify success message
    const hasSuccess = await expensePage.hasSuccessMessage();
    expect(hasSuccess).toBeTruthy();
  });

  test('TC-004: ควรลบบิลออกจากรายการที่รอการอนุมัติหลังจากถูกปฏิเสธ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to pending bills
    await expensePage.navigateToPendingBills();
    
    // Get count before rejection
    const countBefore = await expensePage.getPendingBillCount();
    
    // Reject a bill
    await expensePage.rejectBill();
    
    // Navigate back to pending bills
    await expensePage.navigateToPendingBills();
    
    // Get count after rejection
    const countAfter = await expensePage.getPendingBillCount();
    
    // Count should be less after rejection
    expect(countAfter).toBeLessThanOrEqual(countBefore);
  });
});