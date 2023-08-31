# Getting Started with SEIA UI App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Using this app, the user is able to
1. Enter the number of each type of device they want
2. The number of required transformers will be updated depending on number of batteries selected at a 1:2 ratio
3. The UI will show an auto generated UI of a mock site layout. (This feature needs more work, and given more time, will be completed. It also wasn't exactly clear from instructions how to enforce a max width of 100ft in the layouts). 
4. Saving sessions is also possible by clicking on the save button. The server was written using nodejs and httpserver, hosted on heroku. It serves saved data both for the hosted app and the locally served app.
5. This project was developed using typescript.
6. Tests using the react-testing-library framework is also enabled. Refer to line 22 for more details.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The app will make requests to a server hosted on heroku which is a simple httpserver to allow saving of progress.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
