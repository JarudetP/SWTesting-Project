import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DeleteEmployeePage } from '../pages/DeleteEmployeePage';

test.describe('Delete Employee', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('ลบพนักงาน', async ({ page }) => {
    const deleteEmployeePage = new DeleteEmployeePage(page);

    // Navigate to employee menu
    await deleteEmployeePage.clickEmployeeMenu();
    
    // Delete employee with first name "test" and last name "test"
    await deleteEmployeePage.deleteEmployeeByName('test', 'test');
  });
});
