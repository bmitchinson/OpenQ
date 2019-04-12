// this file is the inroad to open from node
// see package.json "start"
const express = require('express');
const path = require('path');

const expressapp = express();

// Q: Serve static files from the React app?
expressapp.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
// Q: How do you hide the api from raw user access
expressapp.get('/api/test', (req, res) => {
  res.json({
    0: "Result for you!"
  })
  console.log('String from /api/test was returned !')
})

// The "catchall" handler: for any request that doesn't
// match an api above, send back React's index.html file.
expressapp.get('*', (req, res) => {
  console.log("the requested route doesn't exist, redirecting:");
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Q: wow okay so, I asssume this finds whatever port
// is in use in the live instance, or results to 5000
// in the case of local development?
const port = process.env.PORT || 5000;

// assigning that choosen port to expressapp
expressapp.listen(port);

console.log(`Express App Listening on ${port}`);