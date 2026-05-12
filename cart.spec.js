const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';
const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Sauce Demo Add and Remove Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page and login before each test
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');
    
    // Ensure we are on the inventory page
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  // ==================== ADD TO CART TEST CASES ====================

  test('TC-001: Add a single item to the cart from inventory page', async ({ page }) => {
    // Act - Click add to cart for the first item (Backpack)
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Assert - Verify cart badge shows 1
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Assert - Verify the button changed to "Remove"
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText('Remove');
  });

  test('TC-002: Add multiple items to the cart from inventory page', async ({ page }) => {
    // Act - Click add to cart for multiple items
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    // Assert - Verify cart badge shows 3
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('3');
  });

  test('TC-003: Verify added item appears in the cart page', async ({ page }) => {
    // Arrange - Add item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Act - Navigate to cart page
    await page.click('[data-test="shopping-cart-link"]');

    // Assert - Verify we are on cart page
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Assert - Verify the item is listed in the cart
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    
    const itemName = page.locator('.inventory_item_name');
    await expect(itemName).toHaveText('Sauce Labs Backpack');
  });

  // ==================== REMOVE FROM CART TEST CASES ====================

  test('TC-004: Remove item from the cart from inventory page', async ({ page }) => {
    // Arrange - Add item to cart first
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Act - Click remove button for the item
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Assert - Verify cart badge is removed/hidden
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();

    // Assert - Verify the button changed back to "Add to cart"
    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toHaveText('Add to cart');
  });

  test('TC-005: Remove item from cart page', async ({ page }) => {
    // Arrange - Add item to cart and go to cart page
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page.locator('.cart_item')).toHaveCount(1);

    // Act - Click remove button in the cart
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Assert - Verify the item is removed from the list
    await expect(page.locator('.cart_item')).toHaveCount(0);
    
    // Assert - Verify cart badge is hidden
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();
  });

  test('TC-006: Add multiple items, then remove one from cart page', async ({ page }) => {
    // Arrange - Add two items and go to cart page
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="shopping-cart-link"]');
    
    // Assert initial state in cart
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Act - Remove one item
    await page.click('[data-test="remove-sauce-labs-bike-light"]');

    // Assert - Verify only one item remains
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    
    // Verify the correct item remains
    const remainingItemName = page.locator('.inventory_item_name');
    await expect(remainingItemName).toHaveText('Sauce Labs Backpack');
  });

  // ==================== NAVIGATION / FLOW TEST CASES ====================

  test('TC-007: Continue shopping from cart page', async ({ page }) => {
    // Arrange - Go to cart page
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL(/.*cart/);

    // Act - Click continue shopping button
    await page.click('[data-test="continue-shopping"]');

    // Assert - Verify we are back to inventory page
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

});
