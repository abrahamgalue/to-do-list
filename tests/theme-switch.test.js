// @ts-check
import { test, expect } from '@playwright/test'

const URL = 'https://to-do-list-abraham.netlify.app/'
const SWITCH_BTN_CLASS = '.btn-theme'
const documentClass = async (page) => await page.getByRole('document').getAttribute('class')

test('has a change of theme', async ({ page }) => {
  await page.goto(URL)

  const actualTheme = await documentClass(page)

  await page.locator(SWITCH_BTN_CLASS).click()

  const switchTheme = await documentClass(page)

  expect(switchTheme).not.toEqual(actualTheme)
})
