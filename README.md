# Different Lease Ledger API

This is a sample porject created as a quick way to see the ledger for a given lease.

## Assumptions
* To access the endpoint a user should be a authenticated user. Authorization is not needed for the endpoint. 
    * Authentication - is implemented for the endpoint. But token generation (mainly through a /signin endpoint is not implemented)
    * Authorization - is not implemented but the rights are passed through the JWT token if it is required in future. 
* All query parameters are mandotory.


## How to run the application

* Add a token secret in the env file under TOKEN_SECRET
* Since no endpoint created for user login generate a token using the token-generation script file. 

`node token-generation.js`

* Start the server using `npm run start` command. 

## Consume API Endpoint

There are 3 ways which the endpoint can be consumed.

### Using CURL 

`curl -X 'GET' \
  'http://localhost:5000/leases/ledger?start_date=2021-03-28T00%3A00%3A00.000Z&end_date=2021-04-10T00%3A00%3A00.000Z&frequency=FORTNIGHTLY&weekly_rent=555&timezone=Australia%2FSydney' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {token}'`

### Using Swagger UI

Go to `http://localhost:5000/api-docs` in the browser.

![picture alt](/misc/swagger.PNG "Swagger UI")

### Using VS Code extension REST Client

* Install REST Client extension in VS Code
* Go to `request.http` file and consume the endpoint 

![picture alt](/misc/rest-client.PNG "Swagger UI")

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)