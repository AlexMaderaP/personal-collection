# Personal Collection

Personal Collections is a comprehensive platform designed to facilitate the creation, management, and exploration of collections. Whether you're a casual user, a dedicated collector, or an admin overseeing a large community, the app provides a seamless and intuitive experience tailored to your needs.

## [Live Site](https://personal-collection-two.vercel.app/)

Please click on the link above to see a live version of the app.

## Key Capabilities:

### For General Users:

- Easily sign up or log in using GitHub, Google, or email and password.
- Browse and explore a wide range of collections and items, all accessible from the home page without the need to log in.

### For Authenticated Users:

- Enjoy a personalized dashboard where you can create, update, delete, and manage your collections.
- Benefit from powerful tools like sortable and filterable tables, making it easier to organize and locate specific collections.
- Retain full control over your items, with the ability to edit or delete any item you own.

### For Admin Users:

- Access a robust admin dashboard that provides oversight across the entire platform.
- Manage users by blocking/unblocking accounts, granting or revoking admin privileges, and deleting users as necessary.
- Exercise full CRUD (Create, Read, Update, Delete) capabilities over any collection or item within the platform.

### Additional Features:

- Customization and Personalization: The app supports two languages and two distinct themes, ensuring that each user can tailor their experience to their preferences. These choices are saved, providing a consistent user experience across sessions.
- Responsive Design: The platform is fully responsive, offering a seamless experience across all devices, whether you're on a desktop, tablet, or smartphone.

Powered by Next.js for both frontend and backend, and integrated with modern tools like Prisma, PostgreSQL, Clerk, Uploadthing, and Tailwind CSS, Your App's Title offers a modern, scalable solution for collection management and exploration.

## Features

- Unauthenticated Users:

  - Sign in and create an account
  - Access the home page
  - Read collections and items

- Authenticated Users:

  - Personal dashboard for managing collections
  - CRUD operations on collections and items
  - Sort and filter table for collections
  - Edit or delete owned items

- Admin Users:

  - Access all pages, including the admin dashboard
  - Block/unblock users, grant/remove admin rights
  - Delete users
  - CRUD operations on any collection and item

- Additional Features:

  - User registration with GitHub and Google
  - Support for two languages
  - Two themes with saved choices
  - Responsive design

## Tech Stack

- **Frontend/Backend:** Next.js (full stack)
- **CSS Library:** NextUI
- **Data Management:** Prisma, PostgreSQL
- **Authentication:** Clerk
- **Image Upload:** Uploadthing
- **Form Validation:** react-hook-form, Zod
- **Styling:** Tailwind CSS

## Installing

- Clerk Account: Sign up for a Clerk account to obtain your PUBLISHABLE_KEY and SECRET_KEY. You can find more information and sign up here: Clerk
- Uploadthing Account: Sign up for an Uploadthing account to get your SECRET and APP_ID. You can find more information and sign up here: Uploadthing
- PostgreSQL Database: Set up a PostgreSQL database and obtain your DATABASE_URL. You can find instructions on setting up a PostgreSQL database depending on your chosen platform.

### Environment Variables

Create a file named .env in the root directory of your project.

Add the following environment variables from the .env.example file to the .env file, replacing the placeholders with your actual values:

1. Clone the repository
2. Install dependencies. Run the next command in the root folder of this app.

```
npm install
```

3. Set up Prisma:

Generate prisma client:

```
npx prisma generate
```

Run database migrations:

```
npx prisma migrate deploy
```

4. Run the app. In the same path where you installed the dependencies run the next command to run the app in dev mode.

```
npm run dev
```

Open http://localhost:3000 in your browser to see the app running.
