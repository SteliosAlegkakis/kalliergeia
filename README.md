# Build and Run

## 📱 Prerequisites

Before building and running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  
    Install with:  
    ```bash
    npm install -g expo-cli
    ```
- A package manager (like `npm` or `yarn`)
- [Git](https://git-scm.com/)
- An emulator (Android Studio or Xcode), or a physical device with the [Expo Go app](https://expo.dev/client)

---

## 🚀 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

---

## 🔧 Running the App (Development)

To start the development server, run:

```bash
npm start
# or
yarn start
```

This will open the **Expo Developer Tools** in your browser.

---

## 📲 Running on a Device

### Option 1: Expo Go (Easiest)

- Download **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android).
- Scan the QR code shown in the terminal or in Expo Developer Tools.

### Option 2: Emulator

- Start your emulator (Android Studio or Xcode Simulator).
- Run:

    ```bash
    npm run android   # for Android
    npm run ios       # for iOS (Mac only, requires Xcode)
    ```

---

## 📦 Building the App (Production)

To create a production build (for submission to app stores), use:

```bash
npx expo prebuild   # Only if switching from managed to bare workflow
npx expo build
```

Or use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas build --platform ios
npx eas build --platform android
```

> ⚠️ Note: EAS Build requires linking your project to an Expo account. Run `npx expo login` if needed.

---
