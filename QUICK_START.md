## 🚀 QUICK START GUIDE

Follow these steps to get started with the Playwright tests in 5 minutes.

### Step 1: Initial Setup (One time)
```bash
# Navigate to the project folder
cd SUDEO

# Install Node modules
npm install

# Install Playwright browsers
npx playwright install
```

### Step 2: Organize Test Files
```bash
# Create tests directory
mkdir tests

# Move the test file (if not already there)
cp login.spec.js tests/
```

### Step 3: Run Your First Test
```bash
# Run all tests (slow mode, see everything)
npm run test:headed

# Or run in UI mode (interactive)
npm run test:ui
```

## 🎯 Common Commands

| Command | What it does |
|---------|------------|
| `npm test` | Run all tests (headless) |
| `npm run test:ui` | Run tests in interactive UI mode |
| `npm run test:headed` | Run tests with browser window visible |
| `npm run test:debug` | Run in debug mode with inspector |
| `npm run test:report` | View HTML report of last test run |
| `npm run test:chromium` | Run only on Chrome browser |
| `npm run test:parallel` | Run tests simultaneously (faster) |
| `npm run test:serial` | Run tests one by one (slower, safer) |

## 📋 What Gets Tested?

### Positive Cases ✅
- Successful login with valid credentials
- Page loads correctly
- All UI elements are present

### Negative Cases ❌
- Invalid username
- Invalid password
- Empty fields
- Invalid credentials

### Advanced Tests 🔧
- Accessibility (keyboard navigation)
- Performance (page load time)
- Security (SQL injection prevention)
- Session management
- Error messages
- Mobile responsive

## 📊 Test Results

After running tests, you'll see:
- **Pass/Fail count** in terminal
- **Screenshots** in `test-results/` folder (failures only)
- **Videos** of failed tests
- **HTML Report** when you run `npm run test:report`

## 🎬 Example: Run Interactive UI Mode

```bash
npm run test:ui
```

This opens a visual interface where you can:
- ✓ See all test cases
- ✓ Run tests one by one
- ✓ Watch them execute in real-time
- ✓ See which passed/failed with reasons
- ✓ Step through line by line

## 🔥 Most Useful Commands

**First time exploring?**
```bash
npm run test:ui
```

**Want to see browser execute tests?**
```bash
npm run test:headed
```

**Need to debug a failing test?**
```bash
npm run test:debug
```

**Want speed (run in parallel)?**
```bash
npm run test:parallel
```

**Need a detailed report?**
```bash
npm test && npm run test:report
```

## 📞 Troubleshooting

### Issue: "playwright: command not found"
**Solution:**
```bash
npm install
npx playwright install
```

### Issue: Tests time out
**Solution:** Check internet connection and try again:
```bash
npm run test:serial --workers=1
```

### Issue: Browsers not installed
**Solution:**
```bash
npx playwright install --with-deps
```

### Issue: Port already in use
**Solution:** Close other applications or restart terminal

## 💡 Tips & Tricks

1. **Run specific test file:**
   ```bash
   npx playwright test tests/login.spec.js
   ```

2. **Run tests matching a pattern:**
   ```bash
   npx playwright test -g "TC-001"
   ```

3. **Run only one test:**
   ```bash
   npx playwright test -g "Successful login"
   ```

4. **Increase timeout for slow network:**
   Edit `playwright.config.js` and change `timeout: 30000` to `timeout: 60000`

5. **View test code while it runs:**
   ```bash
   npm run test:debug
   ```

## 📱 Mobile Testing

Test on mobile devices:
```bash
npm run test:mobile
```

## 🌐 Different Browsers

**Chrome only:**
```bash
npm run test:chromium
```

**Firefox only:**
```bash
npm run test:firefox
```

**Safari only:**
```bash
npm run test:webkit
```

**All browsers (takes longer):**
```bash
npm test
```

## ✅ Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Playwright installation
npx playwright --version
```

All should show versions (e.g., v18.0.0, 6.0.0, Version 1.40.1)

## 📚 Next Steps

1. ✅ Run: `npm install && npx playwright install`
2. ✅ Test: `npm run test:headed` (watch it work)
3. ✅ Report: `npm run test:report` (see results)
4. ✅ Explore: Open `login.spec.js` to see 30 test cases
5. ✅ Customize: Edit `playwright.config.js` for your needs

## 🎓 Learn More

- Full Documentation: https://playwright.dev/docs/intro
- API Reference: https://playwright.dev/docs/api/class-page
- Best Practices: https://playwright.dev/docs/best-practices

---
**Happy Testing!** 🎉
