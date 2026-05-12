const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';
const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

// Test Data for Checkout
const CHECKOUT_USER = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
};

test.describe('Sauce Demo Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page and login before each test
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');
    
    // Ensure we are on the inventory page
    await expect(page).toHaveURL(/.*inventory/);
    
    // Add an item to the cart and go to the cart page as a prerequisite for checkout tests
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL(/.*cart/);
  });

  // ==================== POSITIVE TEST CASES ====================

  test('TC-001: Successful complete checkout flow', async ({ page }) => {
    // Act - Click Checkout
    await page.click('[data-test="checkout"]');
    
    // Assert - Verify we are on the checkout step 1 (user info)
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    // Act - Fill user information and continue
    await page.fill('[data-test="firstName"]', CHECKOUT_USER.firstName);
    await page.fill('[data-test="lastName"]', CHECKOUT_USER.lastName);
    await page.fill('[data-test="postalCode"]', CHECKOUT_USER.postalCode);
    await page.click('[data-test="continue"]');

    // Assert - Verify we are on checkout step 2 (overview)
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    
    // Assert - Verify the item is in the overview
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    // Act - Finish the checkout
    await page.click('[data-test="finish"]');

    // Assert - Verify checkout complete page
    await expect(page).toHaveURL(/.*checkout-complete/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    
    // Act & Assert - Return home
    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('TC-002: Verify total price calculation in overview', async ({ page }) => {
    // Arrange - Go to checkout overview
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', CHECKOUT_USER.firstName);
    await page.fill('[data-test="lastName"]', CHECKOUT_USER.lastName);
    await page.fill('[data-test="postalCode"]', CHECKOUT_USER.postalCode);
    await page.click('[data-test="continue"]');

    // Assert - Verify item price, tax, and total
    // The backpack is usually $29.99
    const itemPriceText = await page.locator('.inventory_item_price').textContent();
    const itemPrice = parseFloat(itemPriceText.replace('$', ''));
    
    const subtotalText = await page.locator('.summary_subtotal_label').textContent();
    const subtotal = parseFloat(subtotalText.split('$')[1]);
    
    const taxText = await page.locator('.summary_tax_label').textContent();
    const tax = parseFloat(taxText.split('$')[1]);
    
    const totalText = await page.locator('.summary_total_label').textContent();
    const total = parseFloat(totalText.split('$')[1]);

    expect(subtotal).toBe(itemPrice);
    // JS floating point math check with a small epsilon or just exact match if it rounds nicely
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  // ==================== NEGATIVE TEST CASES (FORM VALIDATION) ====================

  test('TC-003: Checkout with empty First Name', async ({ page }) => {
    // Act
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="lastName"]', CHECKOUT_USER.lastName);
    await page.fill('[data-test="postalCode"]', CHECKOUT_USER.postalCode);
    await page.click('[data-test="continue"]');

    // Assert
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText('Error: First Name is required');
  });

  test('TC-004: Checkout with empty Last Name', async ({ page }) => {
    // Act
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', CHECKOUT_USER.firstName);
    await page.fill('[data-test="postalCode"]', CHECKOUT_USER.postalCode);
    await page.click('[data-test="continue"]');

    // Assert
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText('Error: Last Name is required');
  });

  test('TC-005: Checkout with empty Postal Code', async ({ page }) => {
    // Act
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', CHECKOUT_USER.firstName);
    await page.fill('[data-test="lastName"]', CHECKOUT_USER.lastName);
    await page.click('[data-test="continue"]');

    // Assert
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText('Error: Postal Code is required');
  });

  // ==================== NAVIGATION & CANCELLATION TEST CASES ====================

  test('TC-006: Cancel checkout from User Information step', async ({ page }) => {
    // Act
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="cancel"]');

    // Assert - Verify we are back to the cart
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  });

  test('TC-007: Cancel checkout from Overview step', async ({ page }) => {
    // Arrange - Go to overview step
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', CHECKOUT_USER.firstName);
    await page.fill('[data-test="lastName"]', CHECKOUT_USER.lastName);
    await page.fill('[data-test="postalCode"]', CHECKOUT_USER.postalCode);
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL(/.*checkout-step-two/);

    // Act - Click cancel
    await page.click('[data-test="cancel"]');

    // Assert - Verify we are navigated back to inventory (products) page
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

});
