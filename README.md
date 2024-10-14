# User Management Application

This project is a User Management application where users can manage other users (list, view, add, remove, edit). It uses [DummyJSON](https://dummyjson.com/) as the API for example data.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Details

- **Name**: user-management-app
- **Version**: 0.1.0
- **Description**: A React application with Material UI for managing users using DummyJSON API

## Key Features

- User management (list, view, add, remove, edit)
- Integration with DummyJSON API
- Material UI
- Form handling with Formik
- Form validation with Yup
- Storybook for documenting reusable components


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run storybook`

Runs Storybook for developing and testing reusable components.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

## Storybook

This project uses Storybook for developing and showcasing reusable components. Storybook provides a sandbox environment to build and test UI components in isolation.

To run Storybook:

1. Ensure all dependencies are installed by running `npm install`
2. Run the command `npm run storybook`
3. Open your browser and navigate to `http://localhost:6006`

You can now browse and interact with the components in the Storybook interface.

## Form Handling and Validation

This application uses Formik for form management and Yup for form validation:

- **Formik**: Simplifies form handling by managing form state, validation, and submission.
- **Yup**: Provides a schema-based approach to form validation, working seamlessly with Formik.

These libraries together provide a robust solution for creating and validating forms throughout the application.

## API Integration

This application uses the [DummyJSON API](https://dummyjson.com/) for demonstration purposes. Specifically, it utilizes the following endpoint:

- Users: https://dummyjson.com/users

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

For more information about the DummyJSON API, visit their [documentation](https://dummyjson.com/docs).

For Formik documentation, visit [Formik's official site](https://formik.org/).

For Yup documentation, check out [Yup's GitHub page](https://github.com/jquense/yup).

For Storybook documentation, visit [Storybook's official site](https://storybook.js.org/).
