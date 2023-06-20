# [New]
Due to a bug causing the Expo app to freeze when the Datetimepicker and modal appear simultaneously, we have made the decision to utilize "expo prebuild" and introduce components using customized code.

### To launch the project, follow these steps:
1. Open your terminal and navigate to the root folder of the project.
2. Run the command `npm i` to install all the necessary dependencies.
3. Run the command `expo run:[ios|android]` to start the development server. (You may encounter errors if you continue to use "npm start" or "expo start" to launch the app in the Expo App.)

# [Deprecated] kairos-client

This is a React Native app built using Expo SDK48 and the Modern Redux library to manage state.

### To launch the project, follow these steps:

1. Open your terminal and navigate to the root folder of the project.
2. Run the command `npm i` to install all the necessary dependencies.
3. Run the command `npm start` to start the development server.

### The app's code is structured as follows:

1. All the code for the app is contained within the ./src folder.
2. The ./src/components folder contains customized components that can be reused throughout the app.
3. The ./src/features folder contains Redux slices for managing different parts of the app's state.
4. The ./src/screens folder contains all the screens in the app, including navigators.
5. The store.js file contains the configuration for the Redux store.
