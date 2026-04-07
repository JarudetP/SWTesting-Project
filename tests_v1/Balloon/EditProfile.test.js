import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EditProfilePage } from '../pages/EditProfilePage';

test.describe('Edit Profile', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin_test', 'admin');
  });

  test('แก้ไขโปรไฟล์ผู้ใช้', async ({ page }) => {
    const editProfilePage = new EditProfilePage(page);

    // Navigate to profile menu
    await editProfilePage.clickProfileMenu();
    
    // Edit profile
    await editProfilePage.editProfile({
      displayName: 'นายนง ธนงทงทวนคนควรคอย',
      firstName: 'นง',
      lastName: 'ธรงทงทวนคนควรคอย',
      phone: '0987654321',
    });
  });
});
