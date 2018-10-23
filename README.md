## Welcome to the orders apis

This is a demo app to demonstrate order creation , take order and order listing functionality.

### Installation 
``` 
npm install
npm start
```
## How to Install & Run with docker

1.  Clone the repo
2.  Set Google Distance API key in server/config/config.js file line no. 20
3.  Run `./start.sh` to download Docker CE and Docker Compose if not exist
    You may need to grant executable permission to 'start.sh' file
    On Ubuntu: sudo chmod +x start.sh
    after installing them start three containers:
    - the MongoDB database container
    - the Node.js app container
    - the NGINX proxy container
4.  After starting container , testcases will run automatically

## Manually Starting the docker and test Cases

1. You can run `docker-compose up` from terminal
2. Server is accessible at `http://localhost:8080`
3. Run manual testcase suite by `npm test app/test`

## How to Run Tests (Explicity from cli)

 You should be able to run `npm install` followed by `npm test server/test` to run everything (assuming you have the LTS version of Node installed on your machine).

## App Structure

**./server/test**

- this folder contains test case run using `npm test` which in turn uses [Mocha]

**./server**

- `controllers` are Express.js route handlers that have `request`, `response`, and `next` parameters.
- `middlewares` are raw JS "classes" and utility functions for use across the app
- `models` are [Mongoose schema] definitions and associated models
- `routes` are RESTful route declarations using [express.Router module] that utilize the functions in `controllers`
- `schemas` are [JSONSchema] validation schemas for creating or updating a Order.
- `app.js` is what builds and configures the express app
- `config.js` is the app-specific config that you will want to customize for your app
- `index.js` is the entrypoint that actually starts the Express server

**./config**

- config contains NGINX proxy configuration, the production pm2 configuration (the process-runner of choice).

## Google API configuration ##

- add google apk key in Env variables or fallback/default in line 20 of configuration file located in server/config/config.js

##Code style##
- Using eslint for code style
##Test coverage##
- Using instanbul for test coverage
##Swagger
- Using "swagger-ui-express" for api documentation , can be reached at "http://localhost/api-docs" once docker is up
##JWT Auth support
- Though JWT auth (using passport module) support is provided in app but not enabled (due to time limit) for orders APIs, though can be tested with Postman for 'user' APIs.