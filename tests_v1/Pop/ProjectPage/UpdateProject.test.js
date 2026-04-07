import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectPage';

test.describe('Update Project Progress', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('อัปเดทความคืบหน้าไซต์งาน', async ({ page }) => {
    const projectPage = new ProjectPage(page);

    // Navigate to project
    await projectPage.clickProjectByName('โครงการ C');
    
    // Click update progress button
    await projectPage.clickUpdateProgressButton();
    
    // Update all progress fields to 100%
    await projectPage.updateStructureProgress('100');
    await projectPage.updateElectricalProgress('100');
    await projectPage.updatePlumbingProgress('100');
    
    // Save
    await projectPage.clickSaveButton();
  });
});
