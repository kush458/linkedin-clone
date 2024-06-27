# LinkedIn Clone

This app is a semi-clone of LinkedIn based of the requirements provided by FuelBuddy in their technical project assignment.

## Key Features

- Users can create and edit their profiles, including profile and background pictures, work experience, education, and skills, along with a brief bio.
- Users can view their feed page and like/comment on a post or create a post with content and pictures that will be reflected on a user's feed.
- A settings screen provides to log out or navigate to the profile/feed page using the bottom navigation bar.

## Technical Aspects

The app was built using bare-bones React Native while complying with the following technical constraints provided by FuelBuddy:

- Firebase Authentication is used to handle user login and registration process securely.
- Zustand is used to manage the state across the app efficiently.
- MMKV is used for local storage to ensure fast and efficient data retrieval and storage on the device.
- React Navigation is used to handle all navigation and routing within the app.

# Installation Guide

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
