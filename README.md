# MERN-auth

Full MERN stack Authentication

## In this project, I used:

- NodeJs for backend
- MongoDB/Mongoose for Database
- ReactJs for frontend
- Tailwindcss for styling
- JWT for authentication token
- mailtrap library for sending verification emails

## Key Features:

- Signup Endpoint
- Login Endpoint
- Logout Endpoint
- Forgot Password Endpoint
- Reset Password Endpoint
- Check Authentication Endpoint
- Home Page UI
- Login Page UI
- Email Verification Page UI
- Reset Password Page UI

You can [preview](https://mern-auth-g5hn.onrender.com) the project on Render.
##### Note
This project currently does not have a Mailtrap domain email configured. As a result, functionalities such as email verification, password reset, welcome emails, and similar features are not operational.

To test these functionalities, you will need to run the application locally and configure it with your MAILTRAP_TOKEN. Please note that this will only work for the email associated with your Mailtrap account.

## To Run This Project On Your Local Machine

### 1. Clone the repository

```bash
git clone https://github.com/h0dy/MERN-auth.git
```

### 2. Set up environment variables on .env

MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

MAILTRAP_TOKEN=your_mailtrap_token

### 3. Run the application in build mode locally

```bash
npm run build
```

### 4. Start the app

```bash
npm start
```
