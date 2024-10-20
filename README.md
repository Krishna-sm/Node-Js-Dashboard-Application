![image](https://github.com/user-attachments/assets/715273e5-72ea-4d37-b612-9c833583bab8)


## Overview
I am creating an Express.js application that includes functionality for user authentication, specifically login, registration, and logout. The application leverages several technologies and best practices to ensure a smooth user experience and secure authentication.

## Technologies Used
- **Express.js**: A web framework for Node.js, used for building the server-side application.
- **MongoDB**: A NoSQL database for storing user data and application information.
- **Handlebars (HBS)**: A templating engine to dynamically generate HTML pages.
- **Bootstrap**: A front-end framework for responsive design and styling.
- **JWT (JSON Web Token)**: Used for token-based authentication to secure API endpoints.
- **Cookies**: For managing user sessions and JWT tokens.

## Features
- **User Registration**: Allows new users to create an account.
- **User Login**: Authenticates existing users and issues a JWT.
- **User Logout**: Clears the user session and cookie.

## Environment Variables
The application uses an `.env` file to store sensitive configuration details. The following variables are included:

- **MONGO_URI**: The connection string for MongoDB.
- **PORT**: The port on which the application will run.
- **JWT_AUTH**: The secret key used to sign JWT tokens.

### Example `.env` file:
```plaintext
MONGO_URI=mongodb://your_mongo_uri_here
PORT=3000
JWT_AUTH=your_jwt_secret_here

```
![image](https://github.com/user-attachments/assets/052a23f0-5127-4545-a854-e6fa1941580f)

![image](https://github.com/user-attachments/assets/83f641a4-56b8-440d-a04b-05e8d1a711a1)

