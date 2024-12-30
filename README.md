# Psychologist Services Application

## Overview
This application provides users with a platform to connect with professional psychologists. Users can browse a list of psychologists, sort them by various criteria, and save their favorites for quick access. The app includes user authentication and a responsive design that works seamlessly on both mobile and tablet devices.

## Key Features
- **Home Page**: Contains the website's title, company slogan, and a call-to-action link directing users to the "Psychologists" page.
- **Psychologists Page**: Displays a list of psychologists, sortable by name (A-Z or Z-A), price (low to high or high to low), and popularity (low to high or high to low).
- **Favorites Page**: A private page where users can view psychologists they have added to their favorites.

## Technical Requirements
1. **Firebase DB Integration**: Includes user authentication features such as registration, login, user data retrieval, and logout.
2. **React Hook Form & Yup**: Used for form validation and submission in the registration/authentication modal.
3. **Realtime Database**: Stores information about psychologists, including name, avatar URL, experience, reviews, price per hour, rating, license, specialization, initial consultation, and about.

## Functional Specifications
- **Psychologist Cards**: Display psychologist details according to the provided design mockups.
- **Load More Button**: Fetches additional psychologist cards from the database.
- **Favorites Functionality**: Non-authenticated users are prompted to log in when attempting to add to favorites. Authenticated users can add psychologists to their favorites, which persists across sessions using localStorage or Firebase.
- **Modal Windows**: Implemented for login/registration and appointment requests, with proper closing mechanisms.
- **Routing**: Implemented using React Router for navigation between Home, Psychologists, and Favorites pages.

## Styling
- Responsive design that adapts from 320px to 1440px.
- Unique styling variations to make the project stand out.

## Technologies Used
- JavaScript (React)
- Firebase
- React Hook Form & Yup
- CSS for responsive design
- Vite (or other bundlers)

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Deployment
The project is deployed on GitHub Pages, Netlify, or another hosting service. Ensure that you follow the deployment steps specific to your chosen platform.

## Documentation
- **Firebase Docs**: Documentation for integrating Firebase with React applications.
- **Project Design**: Refer to the provided design mockups for detailed UI/UX guidelines.

## Contributions
Feel free to open issues or submit pull requests for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.

https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0