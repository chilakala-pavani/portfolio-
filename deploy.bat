@echo off
title Portfolio Deploy Assistant
color 0b
echo ===================================================
echo     PAVANI.AI PORTFOLIO DEPLOYMENT ASSISTANT
echo ===================================================
echo.
echo This script will publish your portfolio to GitHub Pages.
echo.
echo PREREQUISITE: 
echo 1. Go to https://github.com/new and create a PUBLIC repository named "portfolio".
echo 2. Copy the repository URL (ends with .git).
echo.
set /p REPO_URL="Paste your GitHub Repository URL here and press Enter: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Exiting...
    pause
    exit
)

echo.
echo [1/4] Initializing local Git repository...
git init

echo [2/4] Staging and committing files...
git add .
git commit -m "Initial portfolio release"

echo [3/4] Linking to GitHub...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [4/4] Uploading files to GitHub...
echo (If prompted, please log in to GitHub in the popup window)
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Push failed. Make sure your GitHub URL is correct and you are logged in.
    pause
    exit
)

echo.
echo ===================================================
echo               UPLOAD COMPLETED!
echo ===================================================
echo.
echo Next Steps to get your public HTTPS link:
echo 1. Go to your repository page on github.com
echo 2. Click "Settings" (top right tab)
echo 3. Click "Pages" (in the left menu sidebar)
echo 4. Under "Branch", select "main" and "/ (root)" and click "Save"
echo 5. Wait 60 seconds, and refresh the page.
echo.
echo Your public link will be:
echo https://chilakala-pavani.github.io/portfolio/
echo.
pause
