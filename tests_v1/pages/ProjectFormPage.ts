// tests_v1/pages/ProjectFormPage.ts
import { Page } from '@playwright/test';

/**
 * Project Form Page Object Model - for creating and updating projects
 */
export class ProjectFormPage {
  constructor(private page: Page) {}

  async clickAddProjectButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'เพิ่มไซต์งาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillProjectName(name: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'เช่น โครงการก่อสร้าง A' }).fill(name);
  }

  async fillProjectLocation(location: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ระบุที่ตั้งโดยสังเขป' }).fill(location);
  }

  async fillProjectBudget(budget: string): Promise<void> {
    await this.page.getByPlaceholder('0.00').first().fill(budget);
  }

  async fillStartDate(date: string): Promise<void> {
    await this.page.locator('input[name="start_date"]').fill(date);
  }

  async fillEndDate(date: string): Promise<void> {
    await this.page.locator('input[name="end_date"]').fill(date);
  }

  async clickCreateProjectButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'สร้างไซต์งาน' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async createNewProject(projectData: {
    name: string;
    location: string;
    budget: string;
    startDate: string;
    endDate: string;
  }): Promise<void> {
    await this.clickAddProjectButton();
    await this.fillProjectName(projectData.name);
    await this.fillProjectLocation(projectData.location);
    await this.fillProjectBudget(projectData.budget);
    await this.fillStartDate(projectData.startDate);
    await this.fillEndDate(projectData.endDate);
    await this.clickCreateProjectButton();
  }
}
