<b>Authentication process</b>

1) User submits login credentials in the React component.
2) Redux action sends a request to the backend API to authenticate the user.
3) Backend API validates the credentials and returns a token on successful authentication.
4) Redux action dispatches success or failure actions based on the API response.
5) React component updates its state based on the Redux store and redirects the user or displays an error message.
