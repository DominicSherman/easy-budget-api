# easy-budget-api

GraphQL server deployed using Express and [Firebase](https://console.firebase.google.com/u/0/project/easy-budget-2f9aa/overview) Functions

## Running

 * You will need to download a service account file [from the Firebase console](https://console.firebase.google.com/u/0/project/easy-budget-2f9aa/settings/serviceaccounts/adminsdk) by selecting `Generate new private key`. Rename this file to `service-account.json` and put it in your root project directory. 
 * `yarn` to install the `node_modules`
 * `yarn dev` to start the server
 * Go to `http://localhost:5000/easy-budget-2f9aa/us-central1/graphql` for GraphQL playground
