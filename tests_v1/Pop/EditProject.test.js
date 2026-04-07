import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectPage';
import { EditProjectPage } from '../pages/EditProjectPage';

test.describe('Edit Project', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('แก้ไขไซต์งาน', async ({ page }) => {
    const projectPage = new ProjectPage(page);
    const editProjectPage = new EditProjectPage(page);

    // Navigate to project
    await projectPage.clickProjectByName('โครงการ test');
    
    // Edit project
    await editProjectPage.editProject({
      siteName: 'โครงการ ABC',
      status: 'On Hold',
      budget: '1000',
    });
  });
});
