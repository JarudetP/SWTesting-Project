import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectPage';
import { EmployeePage } from '../pages/EmployeePage';

test.describe('Add Employee', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('เพิ่มพนักงาน', async ({ page }) => {
    const projectPage = new ProjectPage(page);
    const employeePage = new EmployeePage(page);

    // Navigate to project
    await projectPage.clickProjectByName('โครงการ A');
    
    // Navigate to employee tab
    await projectPage.clickEmployeeTab();
    
    // Add multiple employees
    await employeePage.addMultipleEmployees([
      'สมชาย แซ่ตั้ง'
    ]);
  });
});
