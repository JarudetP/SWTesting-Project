import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeeDetailPage } from '../pages/EmployeeDetailPage';

test.describe('View Employee Detail', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('ดูรายละเอียดพนักงาน', async ({ page }) => {
    const employeeDetailPage = new EmployeeDetailPage(page);

    // Navigate and view employee details
    await employeeDetailPage.viewEmployeeDetailByName('นายก', 'หนู');
  });
});
