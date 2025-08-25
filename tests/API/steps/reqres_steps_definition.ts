import { reqresStepHelpers } from '../api_helpers/api_step_helpers';
import { expect } from 'chai';
const { I } = inject();
const api = new reqresStepHelpers(I);


let userListResponse: any;
let registerUserResponse: any;
let updateUserResponse: any;
let updatedDetails = {
    first_name: "msg",
    last_name: "automation"
};
let delayedresponseTime: any;
let responseTime: number;
let loginUserResponse: any;

Given(/^the user send a GET request to "\/api\/users\?page=(\d+)&per_page=(\d+)" endpoint to get the reqres user list$/, async (pagenumber, userperpage) => {
    userListResponse = await api.getUserList(Number(pagenumber), Number(userperpage));
    console.log('User List Response:', JSON.stringify(userListResponse.data, null, 2));
});


Then('the response status code is 200', async () => {
    I.seeResponseCodeIs(200);
});

Then('the user print users with odd ID numbers to console', async () => {
    await api.oddUserID(userListResponse);
});

Given(/^the user send a POST request to "([^"]+)" endpoint to create a new reqres user$/, async (url_endpoint: string) => {
    const requestBody = {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
    };
    registerUserResponse = await I.sendPostRequest(url_endpoint, requestBody);
    console.log('User Registration Response:', JSON.stringify(registerUserResponse.data, null, 2));
});

Then('the user creation was successful with status code 200', async () => {
    I.seeResponseCodeIs(200);
});

Then('the response contains an id and token', async () => {
    I.seeResponseContainsKeys(['id', 'token']);
    console.log(`Registered User ID: ${registerUserResponse.data.id}`);
    console.log(`Registered User Token: ${registerUserResponse.data.token}`);
});

Given(/^the user send a PUT request to "?([^"]+)"? endpoint to update an existing reqres user$/, async (url_endpoint: string) => {
    updateUserResponse = await I.sendPutRequest(url_endpoint, updatedDetails);
    console.log('User Update Response:', JSON.stringify(updateUserResponse.data, null, 2));
})

Then('the response contains updated first_name, last_name and updatedAt timestamp', async () => {
    I.seeResponseContainsKeys(['first_name', 'last_name', 'updatedAt']);
    console.log(`Updated First Name: ${updateUserResponse.data.first_name}`);
    console.log(`Updated Last Name: ${updateUserResponse.data.last_name}`);
    console.log(`Update Timestamp: ${updateUserResponse.data.updatedAt}`);
    I.seeResponseContainsJson(updatedDetails);
});

Given('the user sends a GET request to {string} with delay {string}', async (endpoint: string, delay: string) => {
  const startTime = Date.now();

  delayedresponseTime = await I.sendGetRequest(`${endpoint}?delay=${delay}`);

  const endTime = Date.now();
  responseTime = endTime - startTime;

  console.log(`Delay: ${delay} → Response time: ${responseTime} ms`);
});

Then('the response time should be less than 1000 milliseconds', async () => {
  expect(delayedresponseTime.status).to.equal(200); // validate response
  expect(responseTime).to.be.lessThan(1000, `Response time exceeded: ${responseTime} ms`);
  I.say(`Validated response time: ${responseTime} ms is under 1000 ms`);
});

Given(/^the user send a POST request to "([^"]+)" endpoint to login a reqres user without password$/, async (url_endpoint: string) => {
    const requestBody = {
        email: 'eve.holt@reqres.in',
        password: '' // Intentionally left blank to simulate missing password
    };
    loginUserResponse = await I.sendPostRequest(url_endpoint, requestBody);
    console.log('User Login Response:', JSON.stringify(loginUserResponse.data, null, 2));
});

Then('the response status code is 400', async () => {
    I.seeResponseCodeIs(400);
});

Then('the response contains error message "Missing password"', async () => {
    I.seeResponseContainsJson({ error: 'Missing password' });
    console.log(`Error Message: ${loginUserResponse.data.error}`);
});