import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EditEmployeePage } from '../pages/EditEmployeePage';

test.describe('Edit Employee', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('แก้ไขข้อมูลพนักงาน', async ({ page }) => {
    const editEmployeePage = new EditEmployeePage(page);

    // Navigate to employee menu
    await editEmployeePage.clickEmployeeMenu();
    
    // Edit employee
    await editEmployeePage.editEmployee(
      {
        firstName: 'น้อง',
        lastName: 'ป้อม',
        phone: '0987654321',
        dailyWage: '1999',
      },
      6
    );
  });
});
