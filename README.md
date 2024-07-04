# Facebook Insights Dashboard

This project is a React application that allows users to log in with Facebook and view insights from their Facebook pages.

## Features

- **Facebook Login:** Users can log in using their Facebook account to authenticate.
- **Profile Display:** Once logged in, the user's profile information (name and picture) is displayed.
- **Page Insights:** Displays insights such as total followers, engagement, and impressions for the user's Facebook pages.
- **Facebook SDK Integration:** Utilizes the Facebook JavaScript SDK (`facebook-jssdk`) for authentication and data fetching.

## Technologies Used

- **React:** Frontend framework for building the user interface.
- **Axios:** HTTP client for making requests to the Facebook Graph API.
- **Facebook SDK:** Integrated for handling Facebook login and fetching user data.
- **NodeJS/ExpressJS:** Backend server support for keeping a record of system users in DB
- **MongoDB Atlas:** Database for storing existing users.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd facebook-insights-dashboard

2. Install dependencies:
   ```bash
   #Copy code
   npm install

3. Start the development server:
   ```bash
   Copy code
   npm start

Open your browser and navigate to http://localhost:3000 to view the application.

## Usage:
- Click on the "Login with Facebook" button to authenticate using your Facebook account.
- Once authenticated, you will see your profile information and a dashboard displaying insights for your Facebook pages.

# Visuals:
<img width="1512" alt="image" src="https://github.com/Adan-Asim/fb-pages-management-app/assets/67644268/89fc8e15-9d4f-4124-b016-e3202e73eb92">
<img width="1512" alt="image" src="https://github.com/Adan-Asim/fb-pages-management-app/assets/67644268/3a53e35a-76f0-43e7-8bd8-792d70a35f82">
