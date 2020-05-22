# react-starter
Repo for starting a new React project. Replacement for Create-react-app

# TODO
[/] PM2
[] eslint + prettier
[] React-Router
[] isomorphic-fetch
[] production build
[] Hot module reload


# Setup npm and webpack

`npm init -y`
creates an empty package.json that will hold the configuration of the project

`npm install @babel/core @babel/register @babel/cli @babel/preset-env`

# Setup expressjs

`npm install express morgan dotenv`
* express is an MVC framework for creating an HTTP server.
* morgan creates log files
* dotenv reads ENVIRONMENT variables

# Configure babel
`.babelrc.json`

    {
      "presets": [
        "@babel/preset-env"
      ]
    }

## Create `express server`

`server.js`

	// Set up ======================================================================
	// get all the tools we need
	import express from 'express';
	import http from 'http';
	import logger from 'morgan';
	import path from 'path';

	require('dotenv').config();

	// Configuration ===============================================================
	const app = express();
	app.set('port', process.env.PORT || 8080);
	app.use(logger('short'));

	// Request Handlers
	const publicDir = path.join(__dirname, 'public');

	app.use('/', express.static(publicDir));

	// launch ======================================================================
	// Starts the Express server and write to stdout
	http.createServer(app).listen(app.get('port'), () => {
	  console.log(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
	});

	module.exports = app;


## Bootstrap `express server` for development (to avoid a buildstep in node)
`boot-es6.js`

	// DO NOT USE FOR PRODUCTION!!!!
	process.env.NODE_ENV = 'development';
    require("@babel/register");
    require('./server.js');

# Run server
`node ./boot-es6.js`

# Setup Webpack for React development

`npm install webpack webpack-cli babel-loader style-loader`
* installs webpack
 - webpack-cli is the command line interface that bundles the code
 - babel-loader transpiles ES6 code, so we can use `import`
 - style-loader bundles .css files

`npm install @babel/preset-react`
* adds JSX syntaxt to babel transpiler

`npm install react react-dom`
* installs React

# Re-Configure babel
`.babelrc.json`

    {
      "presets": [
        "@babel/preset-env", "@babel/preset-react"
      ]
    }

# Setup webpack for Reactjs

`webpack.config.js`




# Install PM2 for running node
`npm install pm2`


# Re-Configure `package.json` for running pm2

	{
	    "-prestart": "./node_modules/.bin/pm2 start boot-es6.js --watch",
	}

