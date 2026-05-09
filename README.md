# Playwright Test Suite - Sauce Demo Login Page

Comprehensive automated test suite for the Sauce Demo login page using Playwright, covering 30 test cases including positive, negative, edge cases, accessibility, and performance tests.

## 🎯 Test Coverage

- **30+ Test Cases** covering all login scenarios
- **Multiple Browsers**: Chrome, Firefox, Safari
- **Mobile Testing**: Mobile Chrome and Mobile Safari
- **Accessibility Tests**: Keyboard navigation, labels, ARIA attributes
- **Performance Tests**: Page load and login response time
- **Security Tests**: SQL injection attempts, input validation
- **Edge Cases**: Special characters, long inputs, spacing

## 📋 Test Cases Summary

### Positive Test Cases (TC-001 to TC-003)
- **TC-001**: Successful login with valid credentials
- **TC-002**: Verify login button is clickable and enabled
- **TC-003**: Verify page title and heading elements

### Negative Test Cases (TC-004 to TC-009)
- **TC-004**: Invalid username error handling
- **TC-005**: Invalid password error handling
- **TC-006**: Empty username validation
- **TC-007**: Empty password validation
- **TC-008**: Both fields empty validation
- **TC-009**: Both fields with invalid data

### UI/UX Test Cases (TC-010 to TC-015)
- **TC-010**: Username input field visibility and functionality
- **TC-011**: Password input field visibility and functionality
- **TC-012**: Password field hides input text (type="password")
- **TC-013**: Error message appears and disappears appropriately
- **TC-014**: Logo and branding verification
- **TC-015**: Correct URL and page load verification

### Edge Cases (TC-016 to TC-019)
- **TC-016**: Username with leading/trailing spaces
- **TC-017**: SQL injection attempt prevention
- **TC-018**: Alphanumeric and special characters in username
- **TC-019**: Long password input handling

### Accessibility Tests (TC-020 to TC-022)
- **TC-020**: Form fields properly labeled
- **TC-021**: Keyboard navigation (Tab key through fields)
- **TC-022**: Enter key triggers login action

### Performance Tests (TC-023 to TC-024)
- **TC-023**: Page load time verification (<3 seconds)
- **TC-024**: Login response time verification (<5 seconds)

### Session & Security Tests (TC-025 to TC-028)
- **TC-025**: User session verification after login
- **TC-026**: Logout clears session
- **TC-027**: Locked out user account handling
- **TC-028**: Browser back button doesn't bypass login

### Error Message Tests (TC-029 to TC-030)
- **TC-029**: Exact error message validation
- **TC-030**: Error message display location verification

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Install Playwright Browsers
```bash
npx playwright install
```

### Step 3: Create Tests Directory
```bash
mkdir tests
cp login.spec.js tests/
```

## 🏃 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with Browser Visible
```bash
npm run test:headed
```

### Run Tests for Specific Browser
```bash
npm run test:chromium    # Chrome only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari only
```

### Run Mobile Tests
```bash
npm run test:mobile      # Mobile Chrome
```

### Run Tests in Parallel
```bash
npm run test:parallel    # 4 workers
```

### Run Tests in Serial (One after Another)
```bash
npm run test:serial      # 1 worker
```

### Generate Codegen Script
```bash
npm run codegen          # Interactive script generator
```

### View Test Report
```bash
npm run test:report      # Open HTML report
```

## 📊 Test Credentials

| Field | Value |
|-------|-------|
| **URL** | https://www.saucedemo.com/ |
| **Username** | standard_user |
| **Password** | secret_sauce |

## 📁 Project Structure

```
SUDEO/
├── package.json                 # Project dependencies and scripts
├── playwright.config.js         # Playwright configuration
├── login.spec.js               # Main test file (move to tests/ folder)
├── tests/
│   └── login.spec.js          # Test specifications
└── README.md                   # This file
```

## 🔍 Test File Structure

Each test follows the AAA pattern:
- **Arrange**: Set up test data and preconditions
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

```javascript
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
```

## 🎨 Selectors Used

| Element | Selector |
|---------|----------|
| Username Input | `[data-test="username"]` |
| Password Input | `[data-test="password"]` |
| Login Button | `[data-test="login-button"]` |
| Error Message | `[data-test="error"]` |
| Menu Button | `[data-test="menu-button"]` |
| Logout Link | `[data-test="logout-sidebar-link"]` |
| Page Title | `[data-test="title"]` |
| Inventory List | `[data-test="inventory-list"]` |
| Logo | `.login_logo` |

## 📈 Advanced Features

### Screenshots on Failure
Playwright automatically captures screenshots when tests fail. View them in the HTML report:
```bash
npm run test:report
```

### Video Recording
Videos are recorded for failed tests. Check the `test-results/` folder.

### Trace Files
Detailed execution traces are available for debugging. Open with Playwright Inspector:
```bash
npx playwright show-trace test-results/trace.zip
```

## ⚙️ Configuration Options

Edit `playwright.config.js` to:
- Change timeout values
- Enable/disable specific browsers
- Adjust viewport sizes
- Configure retries
- Change screenshot/video capture settings

### Key Configuration Settings
```javascript
use: {
  trace: 'on-first-retry',      // Capture trace on retry
  screenshot: 'only-on-failure', // Screenshot only on failure
  video: 'retain-on-failure',   // Record video on failure
}
```

## 🐛 Debugging Tips

### 1. Use Playwright Inspector
```bash
npm run test:debug
```

### 2. Use UI Mode for Interactive Testing
```bash
npm run test:ui
```

### 3. Add Debugging Logs
```javascript
console.log('Current URL:', page.url());
console.log('Error message:', await page.locator('[data-test="error"]').textContent());
```

### 4. Pause Execution
```javascript
await page.pause(); // Pauses and opens Inspector
```

### 5. Check Page State
```javascript
const username = await page.locator('[data-test="username"]').inputValue();
console.log('Username value:', username);
```

## 📝 Notes

- Tests use `test.beforeEach()` to navigate to the login page before each test
- All tests are independent and can run in any order
- Error messages are validated against expected text patterns
- Page URLs are checked with regex to allow for query parameters
- Test timeouts are set to default (30 seconds)

## 🔒 Security Considerations

These tests include security validations:
- SQL injection attempt detection
- Input validation with special characters
- Password field type verification
- Session management verification

## ✅ Best Practices Implemented

1. **Descriptive Test Names**: Each test clearly describes what it validates
2. **Test Organization**: Tests are grouped by functionality
3. **DRY Principle**: Common setup in `beforeEach` hook
4. **Readable Assertions**: Uses human-readable expect statements
5. **Cross-Browser Testing**: Configured for Chrome, Firefox, Safari
6. **Data-driven Approach**: Uses test data constants
7. **Accessibility Checks**: Includes keyboard navigation and label verification

## 🤝 Contributing

To add new tests:
1. Follow the existing naming convention (TC-XXX)
2. Group related tests in describe blocks
3. Use descriptive variable names
4. Add comments explaining complex logic
5. Ensure tests are independent

## 📞 Support

For Playwright documentation, visit: https://playwright.dev/docs/intro

## 📄 License

MIT

---

**Last Updated**: 2024
**Playwright Version**: 1.40.1+
