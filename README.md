# Holo-Casting

##### This project includes:

##### - A React.js server.
##### - A Holochain server.
##### - A chokidar-based script made to restart the holochain server when a DNA file is changed.
##### - A script (quickstart.js) made to start everything with a single command
#
### Requirements:

##### - Node.js >= 8.10.0 installed
##### - NPM >=3.5.2 installed
##### - Holochain (holochain-proto)installed
#

- In order to run this app, you will have to go (via terminal) to the folders frontend and backend and run "npm install" in every folder, when you are done just run:

```
node quickstart.js
```

- To take the app to production just build the react app and paste the result in the ui folder of the backend. Then, deploy it as you would do with any other holochain app.

- The file upload is buggy with files larget than 8MB