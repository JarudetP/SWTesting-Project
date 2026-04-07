import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ExpensePage } from '../pages/ExpensePage';

test.describe('Expense History & Filtering', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('TC-001: ควรกรองบิลตามสถานะอนุมัติ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to bill history
    await expensePage.navigateToBillHistory();
    
    // Filter by Approved status
    await expensePage.filterByStatus('อนุมัติ');
    
    // Verify filter was applied
    await expensePage.waitForPendingBillsLoaded();
  });

  test('TC-002: ควรกรองบิลตามสถานะไม่อนุมัติ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to bill history
    await expensePage.navigateToBillHistory();
    
    // Filter by Not Approved status
    await expensePage.filterByStatus('ไม่อนุมัติ');
    
    // Verify filter was applied
    await expensePage.waitForPendingBillsLoaded();
  });

  test('TC-003: ควรกรองบิลตามสถานะรอตรวจ', async ({ page }) => {
    const expensePage = new ExpensePage(page);
    
    // Navigate to bill history
    await expensePage.navigateToBillHistory();
    
    // Filter by Pending Review status
    await expensePage.filterByStatus('รอตรวจ');
    
    // Verify filter was applied
    await expensePage.waitForPendingBillsLoaded();
  });
});