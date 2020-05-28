# react-starter
Repo for starting a new React project.

This should be used as a replacement for Create-react-app.

It has the features you get from CRA, plus serverside rendering. However, and this is a good thing, you will need to set everything up yourself in order to understand what is going on.

Although you can just clone the repo, I would encourage you to read the guide from top to bottom, copy/paste as you go, to understand the full webpack / babel setup.

### Pros and Cons
Use this if 
 - you need full control (which you do for any enterprise project)
 - you are doing server side rendering
 - you want to understand babel and webpack

Don't use this if 
 - you need something quick
 - your project will not get deployed to product, e.g. if you are doing a Storybook component library
 - you mostly need the features from CRA. Check out https://github.com/timarney/react-app-rewired if you are just looking for CRA _with benefits_.

### Features
 - *Eslint + prettier* for codestyle and formatting
 - *React-Router* for client- and serverside routing
 - *expressjs* for the server
 - *webpack + babel* for bundling and transpiling

## 1. Setup server

`npm init -y`
creates an empty package.json that will hold the configuration of the project

### Install Babeljs

`npm install -D @babel/core @babel/cli @babel/preset-env @babel/register @babel/plugin-transform-runtime`

TODO: Explain babeljs packages

### Install expressjs

`npm install express morgan`
* express is an MVC framework for creating an HTTP server.
* morgan creates log files

### Edit `.babelrc`

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### Edit `src/server.js`

```javascript
import express from 'express'
import http from 'http'
import logger from 'morgan'
import path from 'path'

const app = express()
app.set('port', process.env.PORT || 8080)
app.use(logger('short'))

const publicDir = path.join(__dirname, 'public');

app.use('/', express.static(publicDir));

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server running: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})

module.exports = app
```

### Edit `boot-es6.js`

To use ES6 on the server, we need babel to transpile the code to supported js. However, in development, we can do this runtime, and avoid a buildstep. Don't use this for production, though.

```javascript
// DO NOT USE FOR PRODUCTION!!!!
require('dotenv').config()
process.env.NODE_ENV = 'development';
require("@babel/register");
require('./server.js');
```

### Start server
`node ./boot-es6.js`

## 2. Setup client

### Install Webpack for React development

`npm install -D webpack webpack-cli babel-loader style-loader`
* installs webpack
 - webpack-cli is the command line interface that bundles the code
 - babel-loader transpiles ES6 code
 - [ ] style-loader injects .css into styletag in the dom using the bundled .js file.
 - [ ] Probably skip style-loader and use extractcss

`npm install -D @babel/preset-react`
* adds JSX syntax to babel transpiler

`npm install react react-dom react-router-dom`
* installs React

### Edit `.babelrc`

```json
{
  "presets": [
    "@babel/preset-env", "@babel/preset-react"
  ]
}
```

## Setup webpack for Reactjs

### Edit `webpack.config.js`

- [] See what happens, if I add mode: 'development'
- [] Add Css extract here.

```javascript
const path = require('path');

module.exports = {
  entry: {
    main: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  }
};
```

### Edit `package.json`

Add scripts to `package.json` for bundling the client
```json
  "scripts": {
    "build:prod": "./node_modules/.bin/webpack --mode production",
    "build:dev": "./node_modules/.bin/webpack --mode development --watch",
    "start": "npm run build:dev"
  },
```

# Create a Hello World, React App

To test that everything works, with initial render from the server, using PageContext to handle initial state, and client side logic to take it from there.

TODO:
- [] Add Context here.

### Edit `src/react/pages/HelloWorld.jsx` 

```javascript
import React, { useState } from 'react'

import './HelloWorld.css'

const HelloWorld = () => {
  const [name, setName] = useState('World')

  return (
    <div>
      <h1 className="greeting">Hello, {name}</h1>
      <div>Say hello to:</div>
      <div><input type="text" onChange=(e => setName(e..target.value) value={name}) placeholder="Type name here"/></div>
    </div>
  )
}

export default HelloWorld
```

### Edit `src/client.js`

To use react on the client, you need to attach it to the dom.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/app.jsx';

ReactDOM.hydrate(<App />, document.getElementById('root'))
```

### Edit `src/react-server.js`

To use react on the server, you need to render to html, and insert into valid html.

```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './react/pages/App.jsx'

const template = (html) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React starter - Don't forget to change this</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
    />
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="application/javascript" src="/main.bundle.js"></script>
  </body>
</html>`

export default (req, res) => {
    const html = renderToString(<App />);
    return res.send(template(html));
}
```

### Edit `src/server.js`

* Import `react-server` and use it to render all routes.
* Serve the client bundle (output as main.bundle.js) using the express static middleware

```javascript
import reactServer from './react-server'

...
app.use(express.static('build'))
app.use('*', reactServer);

```

# Install PM2 for running node

PM2 is a Process Manager that will monitor your node server, and restarts it, either if it crashes (usually due to an uncaught exception) or, if --watch is applied, when your files change. PM2 is also great for a production setup.

`npm install pm2`

# Edit `package.json` to run pm2

```json
{
  "prestart": "./node_modules/.bin/pm2 start boot-es6.js --watch",
}
```

## 3. Setup React-Router for isomorphic routing

`npm install react-router-dom`

* installs all dependencies for using react-router for web (as opposed to React Native)

`<StaticRouter>` is used for the server, and `<BrowserRouter>` for the client. The official documentation explains each step very well.

### Edit `src/routes.js`

Define routes in its own file, so both client and server can use it. We are likely to fetch data differently depending on whether it's a server or client context, so we expose a method to add datafetching for a given route.

```javascript
import React from 'react'
import { Link } from 'react-router-dom'

// TODO import components

const NavBar = () => <ul><li><Link to="/">Home</Link></li><li><Link to="/">About</Link></li></ul>
const Home = () => <div><h1>Home</h1><NavBar /></div>
const About = () => <div><h1>About</h1><NavBar /></div>
const NotFound = () => <div><h1>404 Not found!</h1><NavBar /></div>

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/app",
    exact: true,
    component: About
  },
  {
    component: NotFound
  }
]
```


### Edit `src/react-server.js`

```javascript
import { StaticRouter, Switch, Route } from "react-router-dom";
import { routes } from './routes'

...

// Export ReactServer as middleware
export default (req, res) => {
  const { originalUrl } = req

  const context = {}
  const html = renderToString(
    <StaticRouter location={originalUrl} context={context}>
      <Switch>
        {routes.map((route, i) => (
          <Route {...route} key={i}/>
        ))}
      </Switch>
    </StaticRouter>
  )

  // check context to determine HTTP statuscode and possible redirect url
  if (context.url && context.status) {
    return res.redirect(context.status, context.url);
  }
  else if (context.url) {
    return res.redirect(302, context.url);
  }
  else if (context.status) {
    return res.status(context.status).send(html);
  }

  // default to 200 OK
  return res.send(template(html));
}
```

### Edit `src/client.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from './routes'

ReactDOM.hydrate(
  <BrowserRouter>
    <Switch>
      {routes.map(route => (
        <Route {...route} key={route.path}/>
      ))}
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
)
```

_You don't need to define and import routes array. You can get away with only using JSX. However, it's needed for serverside data fetching. Even if you don't need serverside data fetching at first, you are likely to need it sooner or later._

## Serverside data fetching.

### Edit `src/server-data.js`

```javascript
const routes = {
  '/hello-world': () => ({name: 'Your name'})
}

export const loadData = (match) => {
  return (match.route in routes) ? routes[match.route](match) : undefined
}
```

### Edit `src/react-server.js`

```javascript
import { loadData } from './server-data.js'

...

// Export ReactServer as middleware
export default (req, res) => {
  const { originalUrl } = req

  const promises = [];
  routes.some(route => {
    const match = matchPath(originalUrl, route);
    if (match && route.loadData) {
      promises.push(loadData(match));
    }

    return match;
  })

  Promise.all(promises).then(data => {
    const context = {}

    const html = renderToString(
      <StaticRouter location={originalUrl} context={context}>
        <Switch>
          {routes.map(route => (
            <Route {...route} key={route.path}/>
          ))}
        </Switch>
      </StaticRouter>
    )

    if (context.url && context.status) {
      return res.redirect(context.status, context.url);
    }
    else if (context.url) {
      return res.redirect(302, context.url);
    }
    else if (context.status) {
      return res.status(context.status).send(html);
    }

    // default to 200 OK
    return res.send(template(html, data));
  })
}
```

## 4. Deploy to Production

When deploying your app to production, you want the slow parts, e.g. transpiling to happen during build - not during runtime. You also want your app and css minified and ship your sourcemaps separately (or not at all)

### Install Webpack plugins
`npm install -D webpack-node-externals optimize-css-assets-webpack-plugin webpack-manifest-plugin`

- _webpack-node-externals_ excludes node_modules for the serverside
- _optimize-css-assets-webpack-plugin_ minifies css
- _webpack-manifest-plugin_ creates `assets.json` containing the hashed filenames of the resulting bundles. The server will use this file to reference the script- and css-bundles when serving html.

### Code changes:
 - read assets.json

### New Webpack.config for
 - server + client
 - optimization for vendor scripts.
  - use externals for react / lodash CDN

### Package.json:
 - add script for build:prod
 - add script for start:prod


```javascript
```

```javascript
```


