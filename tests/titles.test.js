// @ts-check
import { test, expect } from '@playwright/test'

const URL = 'https://to-do-list-abraham.netlify.app/'

test('has title page', async ({ page }) => {
  await page.goto(URL)

  await expect(page).toHaveTitle(/To Do List/)
})

test('has title', async ({ page }) => {
  await page.goto(URL)

  await expect(page.getByRole('heading', { name: 'To-Do List' })).toBeVisible()
})
