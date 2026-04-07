// tests_v1/pages/EditProjectPage.ts
import { Page } from '@playwright/test';

/**
 * Edit Project Page Object Model - for editing project details
 */
export class EditProjectPage {
  constructor(private page: Page) {}

  async clickEditProjectButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'แก้ไขไซต์งาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillSiteName(name: string): Promise<void> {
    await this.page.locator('input[name="site_name"]').fill(name);
  }

  async selectStatus(status: string): Promise<void> {
    await this.page.getByRole('combobox').selectOption(status);
  }

  async fillBudget(budget: string): Promise<void> {
    await this.page.getByPlaceholder('เช่น 1000000').fill(budget);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึกการเปลี่ยนแปลง' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async editProject(projectData: {
    siteName: string;
    status: string;
    budget: string;
  }): Promise<void> {
    await this.clickEditProjectButton();
    await this.fillSiteName(projectData.siteName);
    await this.selectStatus(projectData.status);
    await this.fillBudget(projectData.budget);
    await this.clickSaveButton();
  }
}
