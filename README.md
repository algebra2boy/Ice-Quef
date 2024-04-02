# Ice Quef

### Front-end development of app Ice Queb

Language: JS (React Native framework)


Platforms: iOS, Android, Web

# Welcome to Ice Queb front-end




## Table of contents




[First time using React Native Expo](https://github.com/algebra2boy/Ice-Quef/tree/Jianxin#--if-this-is-the-first-time-you-are-using-react-native-expo)




## -> If this is the first time you are using React Native Expo

### Get a hang of React Native Expo




We are using React Native Expo framework to develop & deploy our app!
If you don't have any experience with it, we recommend you to try it
out before installing our project. 

* Step 1:

   Open VSCode or any IDE you like, and open the terminal from there
and enter this command:

   ```

   npx create-expo-app --template

   ```

   The command will create an Expo managed project for you, then choose 
the blank templet and name your project. The templet can be the
foundation of your app and it can also be used for quick experiments.
Also, remember to change directory to the newly created folder.

* Step 2:

   Run the app by using command:

   ```

   npm start

   ```

   Expo will generate a QR code, along with many other instructions.
It is highly recommended to use the QR code approach because 
it is easy and has no overhead. To use the QR code, first, download
the "Expo go" App. The app can be found in both Apple Store and Google Play.
Second, use your camera to scan the QR code. You will be redirected to
"Expo go" and your project will be opened on your phone.


* Step 3 (optional):
   Run with simulators
  
   Of course, you can use the mobile simulators too. 
Pressing 'i' will open an iOS simulator. The iOS device by default is iPhone 6s, 
which you might want to change to something else. Use 'shift' + 'i' to choose a 
simulator device. I highly suggest you to download as few as possible since each 
one of them exceeds 6GB. If you want to test on android environment. Please refer 
to the 'Testing on an Android emulator' section on this Readme page.

## Coding Standards
1. Please only do things in your own branch.
2. When naming variables, do not use underscores. Instead, use camelCase.
3. All functional component parameters should be contained within { },
   otherwise the code will not work.
4. Always use Kolyn components whenever possible.
5. All pages should be wrapped within the base page.
6. Write 'index.js' files whenever possible. This allows more concise imports.

## Terminology
"Page": referring to a content-rendering screen

"Component": a functional component

"Kit": the foundations of the frontend development

## JSDOCS
AKA, javascript documentations. You can set up one by typing

```
/**
```
in your editor.

Here are some rules you need to follow when creating / editing
a JSDOCS:

1. Variables, Enums, Functions need to be documented.
2. Styling-related things are not documented.
3. You need to write a description for each JSDOCS.
4. To document an Enum, write:
   ```
   @enum { your type }
   ```
5. To document an array, write:
   ```
   @array { your type }
   ```
6. To document a parameter (and you need to write this for each parameter), write:
   ```
   @param { your type } description
   ```
7. To document function parameter, write:
   ```
   @param { func } variableName: description
   ```
8. To document return, write:
   ```
   @return { your type } description
   ```
   












>>>>>>> main
