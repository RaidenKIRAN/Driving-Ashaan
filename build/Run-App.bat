@echo off
setlocal

cd /d "%~dp0.."

if not exist "node_modules" (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

echo Starting Driving-Ashaan...
echo.
call npm.cmd run dev

if errorlevel 1 (
  echo.
  echo The app did not start successfully.
  pause
  exit /b 1
)
