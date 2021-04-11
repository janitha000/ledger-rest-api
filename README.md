# Different Lease Ledger API

This is a sample porject created as a quick way to see the ledger for a given lease.

## Assumptions
* To access the endpoint a user should be a authenticated user. Authorization is not needed for the endpoint. 
    * Authentication - is implemented for the endpoint. But token generation (should be through a /signin endpoint is not implemented)
    * Authorization - is not implemented but the user rights are passed through the JWT token if it is required in future. 
* All query parameters are mandotory.
* start_date, end_date parameters is following simplified extended ISO format (ISO 8601) format and it will be in the same timezone provided in timezone parameter.
* The response will also be in ISO format which will be mapped to client provided timezone.
* Monthly calculation
    * If the start date is on the last day of a month, the next payment day will be always at the end of the month.
    * If not, the next payment day will be the exact same day in the next month (no fixed 30 days count is allocated. Calculation will be done using dynamic number of days in different months)


## How to run the application

* Change the  token secret in the env file under TOKEN_SECRET (OPTIONAL)
* Since no endpoint created for user login generate a token using the token-generation script file. 

`node token-generation.js`

* Start the server using `npm run start` command. 

Server will start listening on port 5000.

## Consume API Endpoint

The API endpoint is available as `http://localhost:5000/leases/ledger` with following mandotory query parameters.
* start_date
* end_date
* frequency
* weekly_rent
* timezone

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


## Run tests

Two types of tests are available under tests folder.
* Unit tests on legder service
* Integration tests on the end point

To run the whole test suite issue `npm run test`.
To only run unit tests issue `npm run test-unit`

To get test coverage issue `npm run test-coverage` 