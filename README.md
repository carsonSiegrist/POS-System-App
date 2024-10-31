# POS-System-App
Point of Sale System App 

# Project Setup Guide

## Prerequisites

1. **Install Node.js and npm**  
   [Download Node.js](https://nodejs.org/) and follow the installation steps. Verify with:
   ```bash
   node -v
   npm -v
   ```

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Install Android Studio**  
   - [Download Android Studio](https://developer.android.com/studio).
   - Follow the setup wizard for a **Standard Installation**.

4. **Create an Android Emulator**
   - Open **Android Studio** > **Device Manager** > **Create Device**.
   - Select a **Tablet** device, configure it, and click **Finish**.

5. **Install Project Dependencies**  
   After cloning the repository, navigate to the project directory and run:
   ```bash
   npm install
   ```

## Running the App

1. **Start Expo Metro Bundler**  
   Navigate to your project folder and run:
   ```bash
   npx expo start
   ```

2. **Connect Emulator to Expo**
   - Open the emulator.
   - In the Expo CLI, press `a` to launch the app in Android Emulator.

The app should now be running on the Android tablet emulator!