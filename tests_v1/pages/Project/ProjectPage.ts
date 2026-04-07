// tests_v1/pages/ProjectPage.ts
import { Page } from '@playwright/test';

/**
 * Project Page Object Model
 */
export class ProjectPage {
  constructor(private page: Page) {}

  async clickProjectByName(projectName: string): Promise<void> {
    await this.page.getByRole('img', { name: projectName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEmployeeTab(): Promise<void> {
    await this.page.getByRole('button', { name: '👷 พนักงาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickExpenseTab(): Promise<void> {
    await this.page.getByRole('button', { name: '💳 ดูค่าใช้จ่าย' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickUpdateProgressButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'อัปเดทความคืบหน้าไซต์งาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async updateStructureProgress(value: string): Promise<void> {
    await this.page.locator('input[name="structure"]').fill(value);
  }

  async updateElectricalProgress(value: string): Promise<void> {
    await this.page.locator('input[name="electrical"]').fill(value);
  }

  async updatePlumbingProgress(value: string): Promise<void> {
    await this.page.locator('input[name="plumbing"]').fill(value);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'บันทึก' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}
