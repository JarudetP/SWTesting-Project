import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectPage';
import { ExpenseFormPage } from '../pages/ExpenseFormPage';

test.describe('Add Bill', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('เพิ่มบิลค่าใช้จ่าย', async ({ page }) => {
    const projectPage = new ProjectPage(page);
    const expenseForm = new ExpenseFormPage(page);

    // Navigate to project
    await projectPage.clickProjectByName('โครงการ A');
    
    // Navigate to expense
    await projectPage.clickExpenseTab();
    
    // Add bill
    await expenseForm.addBill({
      expenseType: 'Materials',
      date: '2026-04-15',
      amount: '1',
      storeName: 'ป้าพร',
    });
  });
});
