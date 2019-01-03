# Coffee Cake ☕

Coffee Cake is a sample web app built with React and Stream's React Components. General data such as a users name, password, and email address are stored in [MongoDB](https://cloud.mongodb.com), whereas other data is persisted in [Stream](https://getstream.io). Server side handling is processed by [AWS Lambda](https://aws.amazon.com/lambda/) using the [Serverless](https://serverless.com) framework.

For simplicity, Coffee Cake does not make use of Redux. All API calls are made via [Axios](https://github.com/axios/axios). Calls to Stream are handled by the [Stream JS](https://github.com/GetStream/stream-js) client, and login with Google is facilitated by [Simple Google Auth](https://github.com/hepiska/simple-google-auth). 

> Note: All social functionality is provided by Stream's [React Components](https://getstream.io/react-activity-feed/), a 100% free component library offering access to dozens of React components with various functionality.

For a live demo hosted on [Netlify](https://netlify.com), please visit [https://coffeecake.app](https://coffeecake.app).

## Functionality 🛠

-   Status updates (similar to Facebook)
-   OG scraping
-   Comments
-   Likes
-   Image uploads
-   Video & GIF support

> Note: Additional functionality and implementation details provided by Stream's React Components can be found [here](https://getstream.github.io/react-activity-feed/).

## Setup 🔌

If you'd like to create a custom version of Coffee Cake locally, you'll need to setup the following free accounts:

1. [Stream](https://getstream.io)
2. [MongoDB Atlas](https://cloud.mongodb.com)
3. [Serverless](https://dashboard.serverless.com)
4. [Google](https://google.com)

Once you have provisioned the above accounts, please create a `.env` file in the root directory of the project with the following:

```
NODE_PATH=./src

REACT_APP_STREAM_ID=YOUR_STREAM_APP_ID
REACT_APP_STREAM_KEY=YOUR_STREAM_API_KEY

REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
REACT_APP_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
REACT_APP_GOOGLE_PROJECT_ID=YOUR_GOOGLE_PROJECT_ID

REACT_APP_API_ENDPOINT=YOUR_SERVERLESS_API_ENDPOINT
```

> Note: You will need to deploy the `serverless` directory with the `sls deploy` command. After deploying to AWS, you will then need to ensure that the AWS Gateway endpoint is live. For further instructions, please refer to [AWS](https://aws.amazon.com) or [Serverless](https://serverless.com).

You will also need to set the following environment variables in your `serverless.yml` file, located inside of the `serverless` directory.

```
DB_URI: YOUR_MONGODB_URI
DB_NAME: YOUR_MONGODB_DB_NAME
STREAM_ID: YOUR_STREAM_APP_ID
STREAM_KEY: YOUR_STREAM_API_KEY
STREAM_SECRET: YOUR_STREAM_API_SECRET
```

## Uploading Code to AWS Lambda via Serverless 👌

The easiest way to upload to Lambda is to use the Serverless command. Assuming that you have configured the AWS CLI with your credentials and installed the Serverless CLI with `npm install -g serverless`, you can run the following command:

```
serverless deploy
```

or

```
sls deploy
```

> Note: If you'd like to run your Lambda locally, you can bypass the deployment to AWS Lambda by running `yarn start`. This will mock the AWS Lambda services, allowing you to use the service on port `8080`.

## Starting Coffee Cake 🚀

Coffee Cake was bootstrapped with Create React App, allowing for fast and easy development. The app has not been ejected and I don't advise doing so. With that being said, you can run `yarn start` to kickoff the app on port `3000`, making it available locally at `https://localhost:3000`.

## Screenshots 📸

![1](https://i.imgur.com/XrgolAl.png)

![2](https://i.imgur.com/sA2ryCr.png)

## Next Steps 💰

As Coffee Cake is an experimental application to demo the functionality of Stream's React Components, additional features will be added to the app in the future. Coffee Cake is also open-source, so please feel free to contribute to the project with PR's. Here's are a couple of things that could be implemented by you in Coffee Cake:

-   Profile Page (with a list of posts that the user created)
-   Edit Profile Page (ability to update profile information – e.g. username, name, bio, password, etc.)
-   Tests
-   Hashtags (support Stream's built-in support with a page to view all posts with corresponding hashtags)
-   Notifications (use Stream's React Component Notification dropdown to display likes, posts, and @mentions)

## Available Scripts 📜

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
