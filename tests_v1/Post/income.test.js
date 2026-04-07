import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { IncomePage } from '../pages/IncomePage';

test.describe('Income Management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('TC-005: ควรบันทึกรายรับใหม่ได้สำเร็จ', async ({ page }) => {
    const incomePage = new IncomePage(page);
    
    // Record income with default data
    await incomePage.recordIncome({
      category: '2',
      amount: '10000',
      checkDate: '2026-04-29',
      transferDate: '2026-05-08'
    });
    
    // Verify success message
    const hasSuccess = await incomePage.hasSuccessMessage();
    expect(hasSuccess).toBeTruthy();
  });

  test('TC-006: ควรสามารถบันทึกรายรับด้วยจำนวนที่กำหนดเองได้', async ({ page }) => {
    const incomePage = new IncomePage(page);
    
    // Record income with custom amount
    const testAmount = '50000';
    await incomePage.recordIncome({
      category: '2',
      amount: testAmount,
      checkDate: '2026-04-30',
      transferDate: '2026-05-09'
    });
    
    // Verify success message
    const hasSuccess = await incomePage.hasSuccessMessage();
    expect(hasSuccess).toBeTruthy();
  });
});