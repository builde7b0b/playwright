# PLAYWRIGHT E2E TESTING WITH Backstage
Yes, if your Backstage application uses OAuth for authentication, you'll need to account for that in your test. 
There are a few approaches you can take to handle OAuth authentication in your Playwright tests:

## Programmatic login (recommended):
Set up the authentication state before running your tests. 
This is typically the fastest and most reliable method.

UI login:
Simulate the user login process through the UI. This is slower but can be useful for end-to-end testing of the login flow itself.

Mock authentication:
If possible, set up a test environment where authentication is bypassed or mocked.
