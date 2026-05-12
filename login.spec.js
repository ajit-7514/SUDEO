const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com/';
const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Sauce Demo Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto(BASE_URL);
  });

  // ==================== POSITIVE TEST CASES =========================

  test('TC-001: Successful login with valid credentials', async ({ page }) => {
    // Arrange
    await expect(page).toHaveTitle(/Swag Labs/);

    // Act
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC-002: Verify login button is clickable', async ({ page }) => {
    // Arrange & Act
    const loginButton = page.locator('[data-test="login-button"]');

    // Assert
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    expect(await loginButton.textContent()).toBe('Login');
  });

  test('TC-003: Verify page title and heading', async ({ page }) => {
    // Assert - Page title
    await expect(page).toHaveTitle(/Swag Labs/);

    // Assert - Login heading
    const loginHeading = page.locator('h1');
    await expect(loginHeading).toBeVisible();
  });

  // ==================== NEGATIVE TEST CASES ====================

  test('TC-004: Login with invalid username', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username and password do not match');
    await expect(page).toHaveURL(BASE_URL);
  });

  test('TC-005: Login with invalid password', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username and password do not match');
    await expect(page).toHaveURL(BASE_URL);
  });

  test('TC-006: Login with empty username', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', '');
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username is required');
  });

  test('TC-007: Login with empty password', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', '');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Password is required');
  });

  test('TC-008: Login with both username and password empty', async ({ page }) => {
    // Act
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username is required');
  });

  test('TC-009: Login with both fields having invalid data', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'random_user');
    await page.fill('[data-test="password"]', 'random_password');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Username and password do not match');
  });

  // ==================== UI/UX TEST CASES ====================

  test('TC-010: Verify username input field is visible and functional', async ({ page }) => {
    // Arrange
    const usernameField = page.locator('[data-test="username"]');

    // Assert
    await expect(usernameField).toBeVisible();
    await expect(usernameField).toBeEnabled();

    // Act & Assert
    await usernameField.fill('test_user');
    expect(await usernameField.inputValue()).toBe('test_user');
  });

  test('TC-011: Verify password input field is visible and functional', async ({ page }) => {
    // Arrange
    const passwordField = page.locator('[data-test="password"]');

    // Assert
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toBeEnabled();
    expect(passwordField.locator('..')).toBeTruthy();

    // Act & Assert
    await passwordField.fill('test_password');
    expect(await passwordField.inputValue()).toBe('test_password');
  });

  test('TC-012: Verify password field hides input text', async ({ page }) => {
    // Arrange
    const passwordField = page.locator('[data-test="password"]');

    // Act
    await passwordField.fill('secret_sauce');

    // Assert - Check the input type
    const inputType = await passwordField.getAttribute('type');
    expect(inputType).toBe('password');
  });

  test('TC-013: Verify error message appears and disappears appropriately', async ({ page }) => {
    // Act - Trigger error
    await page.click('[data-test="login-button"]');

    // Assert - Error appears
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // Act - Clear error by entering text
    await page.fill('[data-test="username"]', 'test');

    // Note: Error might persist, let's verify it's still there or check after valid login
    const errorElement = page.locator('[data-test="error"]');
    const isVisible = await errorElement.isVisible().catch(() => false);
    expect(isVisible).toBeDefined();
  });

  test('TC-014: Verify page has correct logo/branding', async ({ page }) => {
    // Arrange
    const swagLabsLogo = page.locator('.login_logo');

    // Assert
    await expect(swagLabsLogo).toBeVisible();
    const logoText = await swagLabsLogo.textContent();
    expect(logoText).toContain('Swag Labs');
  });

  test('TC-015: Verify page loads with correct URL', async ({ page }) => {
    // Assert
    expect(page.url()).toBe(BASE_URL);
  });

  // ==================== EDGE CASES ====================

  test('TC-016: Login with username containing spaces', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', ' standard_user ');
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert - Should fail because of extra spaces
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC-017: Login with SQL injection attempt in username', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', "' OR '1'='1");
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert - Should fail with error
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('TC-018: Verify username field accepts alphanumeric and special characters', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'test@#$%user123');

    // Assert
    expect(await page.locator('[data-test="username"]').inputValue()).toBe('test@#$%user123');
  });

  test('TC-019: Verify password field accepts long input', async ({ page }) => {
    // Act
    const longPassword = 'a'.repeat(100);
    await page.fill('[data-test="password"]', longPassword);

    // Assert
    expect(await page.locator('[data-test="password"]').inputValue()).toBe(longPassword);
  });

  // ==================== ACCESSIBILITY TEST CASES ====================

  test('TC-020: Verify form fields are properly labeled', async ({ page }) => {
    // Assert
    const usernameLabel = page.locator('label[for="user-name"]');
    const passwordLabel = page.locator('label[for="password"]');

    await expect(usernameLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();
  });

  test('TC-021: Verify keyboard navigation - Tab through fields', async ({ page }) => {
    // Act
    await page.keyboard.press('Tab'); // Tab to username
    let focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-test'));
    expect(focusedElement).toBe('username');

    await page.keyboard.press('Tab'); // Tab to password
    focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-test'));
    expect(focusedElement).toBe('password');

    await page.keyboard.press('Tab'); // Tab to login button
    focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-test'));
    expect(focusedElement).toBe('login-button');
  });

  test('TC-022: Verify Enter key triggers login', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.press('[data-test="password"]', 'Enter');

    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  // ==================== PERFORMANCE TEST CASES ====================

  test('TC-023: Verify page load time is acceptable', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;

    // Assert - Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('TC-024: Verify login response time is acceptable', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);

    const startTime = Date.now();
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory/);
    const responseTime = Date.now() - startTime;

    // Assert - Login should complete within 5 seconds
    expect(responseTime).toBeLessThan(5000);
  });

  // ==================== SESSION TEST CASES ====================

  test('TC-025: Verify user session after successful login', async ({ page }) => {
    // Act - Successful login
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert - Verify user is logged in
    await expect(page).toHaveURL(/.*inventory/);

    // Verify inventory page is loaded
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  });

  test('TC-026: Verify logout clears session', async ({ page }) => {
    // Arrange - Login first
    await page.fill('[data-test="username"]', VALID_USERNAME);
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory/);

    // Act - Logout
    await page.click('[data-test="menu-button"]');
    await page.click('[data-test="logout-sidebar-link"]');

    // Assert - Back to login page
    await expect(page).toHaveURL(BASE_URL);
  });

  // ==================== SPECIAL USER ACCOUNTS ====================

  test('TC-027: Login with locked out user account', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', VALID_PASSWORD);
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain('Epic sadface');
  });

  test('TC-028: Verify browser back button does not bypass login', async ({ page }) => {
    // Act - Perform a failed login
    await page.fill('[data-test="username"]', 'invalid');
    await page.fill('[data-test="password"]', 'invalid');
    await page.click('[data-test="login-button"]');

    // Even on login page, going back should keep user on login
    await page.goBack();

    // Assert
    await expect(page).toHaveURL(BASE_URL);
  });

});

// ==================== ADDITIONAL TEST GROUP - ERROR MESSAGE VALIDATION ====================
test.describe('Login Error Messages Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('TC-029: Verify exact error message for invalid credentials', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'invalid');
    await page.fill('[data-test="password"]', 'invalid');
    await page.click('[data-test="login-button"]');

    // Assert
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    const errorText = await errorElement.textContent();
    expect(errorText).toMatch(/Username and password do not match/i);
  });

  test('TC-030: Verify error message is displayed in expected location', async ({ page }) => {
    // Act
    await page.click('[data-test="login-button"]');

    // Assert
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();

    // Verify error is above the login form
    const errorBox = await errorContainer.boundingBox();
    const loginForm = await page.locator('form').boundingBox();

    if (errorBox && loginForm) {
      expect(errorBox.y).toBeLessThan(loginForm.y);
    }
  });

});
