import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProjectFormPage } from '../pages/ProjectFormPage';

test.describe('Add Project', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('เพิ่มโครงการใหม่', async ({ page }) => {
    const projectForm = new ProjectFormPage(page);

    // Create new project
    await projectForm.createNewProject({
      name: 'โครงการ C',
      location: 'ลาดพร้าว',
      budget: '10',
      startDate: '2026-04-16',
      endDate: '2027-12-22',
    });
  });
});
