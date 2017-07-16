# NPRStream

A simple concept app that lets you login to your NPR account and listen to recommended recordings. This project only has code for the Android side. 

## Getting Started

1) `yarn` or `npm i` to install dependencies. `yarn global add react-native-cli` or `npm i -g react-native-cli` if you do not have the CLI installed.
2) `brew update` and `brew install watchman` to install watchman on your machine
4) Create a file named `.env` in the project directory and add your `CLIENT_ID` and `SECRET` variables from a project on your NPR dev account. This is required for the app to work. 
3) Plug in your Android phone, Version 6.0.0 Marshmallow or above.
3) `npm start` to start the react native CLI. In another terminal window, run `react-native run-android` to build and install the APK.