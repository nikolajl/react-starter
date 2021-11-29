# react-starter
Hej Thomas,


Så har jeg kigget på den lange liste - og du har helt ret - der er plads til forbedring.

Jeg har givet mit ufiltrerede feedback nedenfor, hvis det kan bruges til noget - ellers kan du arkivere det i skraldespanden :-)

Udover kompetencelisten lagde jeg mærke til at adressen heller ikke passer. Jeg er nok flyttet siden sidst.

Den nye adresse er:
Engblommevej 30
2400 København NV

Mvh. Nikolaj...


og så til ufiltreret feedback.

Der er flere problemer med listen, men de 2 store problemer er: Kategorierne (fanerne) giver ingen mening, og der er mange dubletter.

Mit forslag (tl;dr): 
* Drop versioner, og fjern dubletter. Det vil reducere listen betydeligt.
* Reducer kategorierne til: Rolle, Branche, Arbejdsområde, Metode og Teknologi/Værktøj.

Problemerne er mange, men her er et par eksempler:

Angular (der er et javascript framework) findes i kategorierne:
  Standard software:	Angular
  Java EE:	Angular 2+
  Java EE:	AngularJS
... men ikke i kategorien WEB, hvor den burde være.

Et andet eksempel er MS SQL Server, der findes i flere versioner og kategorier:
  Database:	Microsoft SQL
  Database:	MS SQL
  Databaseværktøjer:	MS SQL 2016
  Databaseværktøjer:	MS SQL 2017
  Databaseværktøjer:	MS SQL 2017
  Databaseværktøjer:	MS SQL 2019
  Databaseværktøjer:	MS SQL2000
  Databaseværktøjer:	MS SQL2005
  Databaseværktøjer:	MS SQL2008
  Databaseværktøjer:	MS SQL2008R2
  Databaseværktøjer:	MS SQL2012
  Databaseværktøjer:	MS SQL2014
  Databaseværktøjer:	MS SQL2016
  Database:	SQL Server Management Studio
  Databaseværktøjer:	SQL Server Management Studio

Så er der dem der bare forskellige navne for præcis det samme:
  Programmeringssprog	.NET
  Programmeringssprog	C#.NET
  Programmeringssprog	C#

eller
  WEB	.NET MVC
  Teknologi	ASP.NET MVC

Og endelig dem der er i helt forkerte kategorier:
  Programmeringssprog:	Tortoise SVN
... som er et windows program, ikke et programmeringssprog.

Når jeg fjerner versioner og dubletter reduceres min liste af kompetencer fra 350 til ca. 150 (med 20 års erfaring har jeg nok flere end de fleste).

Det er selvfølgelig et stort stykke arbejde - men mon ikke I kan finde en studentermedhjælp, der med hjælp fra Google kan gøre det meste.

Hvis du er kommet så langt i mailen - så, tak for ordet. Nu skal jeg nok lade dig komme tilbage til dit rigtige arbejde :o)


Mvh. Nikolaj.



Repo for starting a new React project.

This should be used as a replacement for Create-react-app.

It has the features you get from CRA, plus serverside rendering. However, and this is a good thing, you will need to set everything up yourself in order to understand what is going on.

Although you can just clone the repo, I would encourage you to read the guide from top to bottom, copy/paste as you go, to understand the full webpack / babel setup.

### Pros and Cons
Use this if 
 - you need full control (which you do for any enterprise project)
 - you need server side rendering
 - you want to understand babel and webpack

Don't use this if 
 - you are just prototyping
 - your project will not get deployed to production, e.g. if you are doing a Storybook component library
 - you mostly need the features from CRA. Check out https://github.com/timarney/react-app-rewired if you are just looking for CRA _with benefits_.

### Features
 - **Eslint + prettier** for codestyle and formatting
 - **React-Router** for client- and serverside routing
 - **expressjs** for the server
 - **webpack + babel** for bundling and transpiling

## 1. Setup server

`npm init -y`
creates an empty package.json that will hold the configuration of the project

### Install Babeljs

`npm install -D @babel/core @babel/preset-env @babel/register @babel/plugin-transform-runtime`
 * @babel/core is just that; core
 * @babel/preset-env is a set of sensible defaults
 * @babel/register is used for transpiling at runtime; this saves us from building the server while developing
 * @babel/plugin-transform-runtime contains ES6 features needed with @babel/register

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
process.env.PORT = 3001;
require("@babel/register")({
  plugins: ["@babel/plugin-transform-runtime"]
});
// ignore `import '*.css'` statements
require.extensions['.css'] = () => {};
require('./server.js');
```

### Verify the server works
`node ./boot-es6.js`

## 2. Setup client

### Install Webpack for React development

`npm install -D webpack webpack-cli babel-loader css-loader mini-css-extract-plugin`
* installs webpack
 - webpack-cli is the command line interface that bundles the code
 - babel-loader transpiles ES6 code
 - css-loader bundles .css files.
 - mini-css-extract-plugin creates the files css-loader found into a single file (per entry in webpack conf)

`npm install -D @babel/preset-react`
* adds JSX syntax to babel transpiler

`npm install react react-dom react-router-dom`
* react is the library for React
* react-dom renders React elements in the DOM or as html serverside.
* react-router-dom handles clientside routing. Also works serverside.

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

- [] Add Css extract here.

```javascript
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};
```

### Edit `package.json`

Add scripts to `package.json` for bundling the client
```json
  "scripts": {
    "build:dev": "./node_modules/.bin/webpack --mode development --watch",
    "prestart": "node server.js",
    "start": "npm run build:dev"
  },
```

## Create a Hello World, React App

Let's create a simple HelloWorld, that renders on the server, handles updates on the client and bundles css.


### Edit `src/react/pages/HelloWorld.css` 

```css
.greeting {
  font-size: 2rem
}
```

### Edit `src/react/pages/HelloWorld.jsx` 

```javascript
import React, { useState } from 'react'

import './HelloWorld.css'

const HelloWorld = () => {
  const [name, setName] = useState('World')

  return (
    <div>
      <h1 className="greeting">Hello, {name}</h1>
      <div>Say hello to: </div>
      <div><input type="text" value={name} placeholder="Type name here" onChange={e => setName(e.target.value)}/></div>
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
import HelloWorld from './react/app.jsx';

ReactDOM.hydrate(<App />, document.getElementById('root'))
```

### Edit `src/server-react-middleware.js`

To use react on the server, we need to render to html, and insert into valid html. We create this as middleware, and plug it into expressjs

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

* Import `server-react-middleware` and use it to render all routes.
* Serve the client bundle (output as main.js) using the express static middleware

```javascript
import reactServer from './react-server'

...
app.use(express.static('build'))
app.use(reactServer);

```

## Install PM2 for running node

PM2 is a Process Manager that will monitor your node server, and restarts it, either if it crashes (usually due to an uncaught exception) or, if --watch is applied, when your files change. PM2 is also great for a production setup.

`npm install pm2`

### Edit `package.json` to run pm2

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

// TODO: Create your own components
import HelloWorld from './pages/HelloWorld.jsx'

const NavBar = () => <ul><li><Link to="/">Home</Link></li><li><Link to="/hello">Hello</Link></li></ul>
const Home = () => <div><h1>Home</h1><NavBar /></div>
const Hello = () => <div><HelloWorld /><NavBar /></div>
const NotFound = ({staticContext}) => {
  // Source: https://reacttraining.com/react-router/web/guides/server-rendering
  if (staticContext) {
    staticContext.status = 404
  }

  return (<div><h1>404 Not found!</h1><NavBar /></div>)
}

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/hello",
    exact: true,
    component: Hello
  },
  {
    component: NotFound
  }
]
```


### Edit `src/server-react-middleware.js`

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
  '/hello': () => ({name: 'Server'})
}

export const loadData = (match) => {
  return (match.route in routes) ? routes[match.route](match) : undefined
}
```

### Edit `src/react/context.js`

With InitialDataContext the server data can be exposed to the client without handing down props at every level

```javascript
import { createContext } from 'react'

export const InitialDataContext = createContext()
```

### Edit `src/react/hooks.js`

A custom `useInitialData()` hook will make getting the data on the client easy.


```javascript
import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { InitialDataContext } from './context'


export const useInitialData = (asyncLoad) => {
  const initialData = useContext(InitialDataContext)
  const [data, setdata] = useState(initialData)

  useEffect(() => {
    if (!initialData && typeof asyncLoad === 'function') {
      (async () => {
        const result = await asyncLoad()
        setdata(result)
      })()
    }
  }, [])

  return data
}

```

### Edit `src/react/app.js`

```javascript
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route,  useLocation } from "react-router-dom";
import { routes } from './routes'
import { InitialDataContext } from './context'

export const App = ({data}) => (
  <InitialDataContext.Provider value={data}>
    <Switch>
      {routes.map((route, i) => (
        <Route {...route} key={i}/>
      ))}
    </Switch>
  </InitialDataContext.Provider>
)

export const Client = () => {
  const initialData = window.__INIT_DATA__
  const location = useLocation()

  // Clear the initial data, when user navigates in the browser
  useEffect(() => {
    delete window.__INIT_DATA__
  }, [location])

  return <App data={initialData}/>
}
```


### Edit `src/client.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { Client } from './react/app'

ReactDOM.hydrate(
  <BrowserRouter>
    <Client />
  </BrowserRouter>
  , document.getElementById('root')
)
```


### Edit `src/server-react-middleware.js`

```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import { routes } from './react/routes'
import { App } from './react/app'
import { loadData } from './server-data.js'

...

// Export ReactServer as middleware
export default async (req, res) => {
  const { originalUrl } = req

  const promises = routes
    .map(route => matchPath(originalUrl, route))
    .filter(match => match)
    .map(match => loadData(match))

  const data = await Promise.all(promises)
  const context = {}

  const html = renderToString(
    <StaticRouter location={originalUrl} context={context}>
      <App data={data[0]} />
    </StaticRouter>
  )

  if (context.url && context.status) {
    return res.redirect(context.status, context.url)
  }
  else if (context.url) {
    return res.redirect(302, context.url)
  }

  // default to 200 OK
  return res.send(template(html, data[0])).status(context.status || 200)
}
```

## 4. Deploy to Production

When deploying your app to production, you want the slow parts, e.g. transpiling to happen during build - not during runtime. You also want your app and css minified and ship your sourcemaps separately (or not at all)

### Install Webpack plugins
`npm install -D webpack-node-externals optimize-css-assets-webpack-plugin webpack-manifest-plugin`

- _webpack-node-externals_ excludes node_modules for the serverside
- _optimize-css-assets-webpack-plugin_ minifies css
- _webpack-manifest-plugin_ creates `assets.json` containing the hashed filenames of the resulting bundles. The server will use this file to reference the script- and css-bundles when serving html.

`npm install nconf`

 * _nconf_ reads assets.json configuration

### Code changes:
 - read assets.json

### New Webpack.config for
 - server + client
 - optimization for vendor scripts.
  - use externals for react / lodash CDN

### Package.json:
 - add script for build:prod
 - add script for start:prod

### Package.json:
 - add config with env for pm2 in prod


```javascript
```

```javascript
```


