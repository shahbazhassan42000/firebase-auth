# Firebase-Auth
Firebase-Auth is a React app that allows users to sign in with their mobile number using one-time password (OTP) verification provided by Firebase Authentication.

## Features
- User can enter their mobile number and request an OTP code via SMS.
- User can enter the OTP code and sign in to the app.
- User can sign out of the app.
## Installation
To run this app, you need to have Node.js and npm installed on your machine. You also need to create a Firebase project and enable the phone authentication method. Follow these steps:

Clone this repository: 
```bash
git clone https://github.com/your-username/Firebase-Auth.git
```
Navigate to the project directory: 
```bash
cd firebase-auth
```
Install the dependencies: 
```bash
npm install
```
Create a .env file in the root directory and add your Firebase configuration variables. For example:
```bash
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id
```
Start the development server:
```bash
npm start
```

  Open http://localhost:3000 in your browser and enjoy the app!