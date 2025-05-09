# Instructions: Setting Up React Native (Expo Bare) Project

We will now set up the React Native (Expo Bare workflow) project. This project will reside in a subdirectory within your main `kharom-ai-powered-dating-buddy-mvp` project. We'll name this subdirectory `mobile-app`.

## Step 1: Navigate to Project Root (if not already there)
Open your terminal and ensure you are in the main project root directory:
`d:/Eiat_Folder/MyProjects/MyOtherProjects/kharom-ai-powered-dating-buddy-mvp`

## Step 2: Create the Expo Application
Execute the following command to create a new Expo project using the "Bare" workflow with TypeScript. When prompted, you can choose a "Blank (Bare)" template.

```bash
npx create-expo-app mobile-app --template bare-typescript
```
Alternatively, if you prefer Yarn:
```bash
yarn create expo-app mobile-app --template bare-typescript
```

This command will:
1.  Create a new directory named `mobile-app`.
2.  Scaffold a new Expo project inside `mobile-app` using the Bare workflow and TypeScript.
3.  Install necessary dependencies. This might take a few minutes.

## Step 3: Verify Project Creation
Once the command finishes:
1.  Navigate into the new directory:
    ```bash
    cd mobile-app
    ```
2.  You should see a typical Expo project structure, including `package.json`, `app.json`, an `ios` folder, an `android` folder, etc.
3.  You can try running the development server to ensure it's set up correctly (optional, but recommended):
    ```bash
    npm run ios 
    # or npm run android, or npm start for the QR code
    ```
    (This requires having Xcode command line tools or Android Studio setup for simulators/emulators, or the Expo Go app on your device.)

## Step 4: Initial Project Structure within `mobile-app/src/`
According to our project plan (`.clinerules/clinerules.md`), the React Native specific source code will reside within a `src` directory inside `mobile-app`.

1.  If a `src` directory doesn't exist at `mobile-app/src`, create it.
2.  Inside `mobile-app/src/`, you will later create the following subdirectories as needed:
    *   `components/`
    *   `screens/`
    *   `navigation/`
    *   `hooks/`
    *   `services/`
    *   `constants/`
    *   `locales/`
    *   `assets/` (Note: Expo projects often have a root-level `assets` folder as well; decide if you want to consolidate or have both).

    The main application entry point (e.g., `App.tsx`) will likely be at the root of `mobile-app/` or moved into `mobile-app/src/` depending on preference. For now, the default location from `create-expo-app` is fine.

---

Once you have successfully created the `mobile-app` directory and the Expo project within it, please let me know. We will then update the project roadmap and proceed to set up the Next.js API project.
