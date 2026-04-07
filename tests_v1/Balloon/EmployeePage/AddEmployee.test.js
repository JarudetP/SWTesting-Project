import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EmployeeManagementPage } from '../pages/EmployeeManagementPage';

test.describe('Add Employee', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('เพิ่มพนักงานใหม่', async ({ page }) => {
    const employeeManagement = new EmployeeManagementPage(page);

    // Navigate to employee menu
    await employeeManagement.clickEmployeeMenu();
    
    // Add new employee
    await employeeManagement.addNewEmployee({
      firstName: 'นายก',
      lastName: 'หนู',
      position: 'นายก',
      phone: '0934561237',
      nationalId: '123456',
      wageGroup: '1',
      dailyWage: '8',
      hireDate: '2000-11-22',
      assignedSite: 'โครงการ AA',
    });
  });
});
