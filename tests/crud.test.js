import { test, expect } from '@playwright/test'

const URL = 'https://to-do-list-abraham.netlify.app/'

async function addTask(page, taskText) {
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(taskText);
  await page.locator('.submit-btn').click();
}

async function verifyTaskVisibility(page, taskText, shouldBeVisible = true) {
  if (shouldBeVisible) {
    await expect(page.getByText(taskText)).toBeVisible();
  } else {
    await expect(page.getByText(taskText)).not.toBeVisible();
  }
}

test('create a new task', async ({ page }) => {
  await page.goto(URL)
  await addTask(page, 'Make the tests');
  await verifyTaskVisibility(page, 'Make the tests');
})

test('complete a task', async ({ page }) => {
  await page.goto(URL)
  await addTask(page, 'Using Vitest');
  await verifyTaskVisibility(page, 'Using Vitest');

  await page.locator('.complete-btn').click()
  await verifyTaskVisibility(page, 'Using Vitest', false);
})

test('edit a task', async ({ page }) => {
  await page.goto(URL)
  await addTask(page, 'Using Vitest');
  await verifyTaskVisibility(page, 'Using Vitest');

  await page.locator('.edit-btn').click()
  await page.getByRole('textbox').fill('Using Playwright')
  await page.locator('.submit-btn').click()
  await verifyTaskVisibility(page, 'Using Playwright');
})

test('clear all tasks', async ({ page }) => {
  await page.goto(URL)
  await addTask(page, 'Using Playwright');
  await verifyTaskVisibility(page, 'Using Playwright');

  await addTask(page, 'Using Jest');
  await verifyTaskVisibility(page, 'Using Jest');

  await page.locator('.clear-btn').click()
  await verifyTaskVisibility(page, 'Using Playwright', false);
  await verifyTaskVisibility(page, 'Using Jest', false);
})
