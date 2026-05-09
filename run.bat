@echo off
REM Helper script for Windows users to run common Playwright test commands

setlocal enabledelayedexpansion

if "%1%"=="" goto :menu

if /i "%1%"=="install" goto :install
if /i "%1%"=="test" goto :test
if /i "%1%"=="ui" goto :ui
if /i "%1%"=="debug" goto :debug
if /i "%1%"=="headed" goto :headed
if /i "%1%"=="report" goto :report
if /i "%1%"=="mobile" goto :mobile
if /i "%1%"=="parallel" goto :parallel
if /i "%1%"=="help" goto :help

echo Unknown command: %1%
goto :help

:install
echo Installing dependencies...
call npm install
echo Installing Playwright browsers...
call npx playwright install
echo Done!
pause
exit /b

:test
echo Running all tests (headless)...
call npm test
pause
exit /b

:ui
echo Running tests in UI mode (interactive)...
call npm run test:ui
exit /b

:debug
echo Running tests in debug mode...
call npm run test:debug
exit /b

:headed
echo Running tests with browser visible...
call npm run test:headed
pause
exit /b

:report
echo Opening test report...
call npm run test:report
exit /b

:mobile
echo Running mobile tests...
call npm run test:mobile
pause
exit /b

:parallel
echo Running tests in parallel...
call npm run test:parallel
pause
exit /b

:menu
echo.
echo ========================================
echo   PLAYWRIGHT TEST RUNNER - MENU
echo ========================================
echo.
echo Usage: run.bat [COMMAND]
echo.
echo Commands:
echo   install    - Install dependencies (run once)
echo   test       - Run all tests (headless)
echo   ui         - Run tests in interactive UI mode
echo   debug      - Run in debug mode with inspector
echo   headed     - Run tests with browser visible
echo   report     - View test report
echo   mobile     - Run mobile tests
echo   parallel   - Run tests simultaneously
echo   help       - Show this menu
echo.
echo Examples:
echo   run.bat install    (first time setup)
echo   run.bat test       (run tests)
echo   run.bat ui         (interactive mode)
echo   run.bat headed     (watch tests run)
echo.
pause
exit /b

:help
goto :menu
