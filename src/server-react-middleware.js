import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'

import config from 'nconf'
import { routes } from './react/routes'
import { App } from './react/app'
import { loadData } from './server-data.js'
import path from 'path'

config.file('assets', 'assets.json')

const assets = config.stores.assets.get()

const css = `<link rel="stylesheet" href="/${assets['main.css']}"/>`
const js =
  ('vendors~main.js' in assets
    ? `<script type="application/javascript" src="/${assets['vendors~main.js']}"></script>`
    : '') +
  `<script type="application/javascript" src="/${assets['main.js']}"></script>`

const template = (html, data) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Isomorphic Router Demo</title>
    ${css}
  </head>
  <body>
    <div id="root">${html}</div>
    ${
      data
        ? `<script>window.__INIT_DATA__ = ${JSON.stringify(data)}</script>${js}`
        : js
    }
  </body>
</html>`

// Export ReactServer as middleware
export default async (req, res) => {
  const { originalUrl } = req

  const promises = routes
    .map((route) => matchPath(originalUrl, route))
    .filter((match) => match)
    .map((match) => loadData(match))

  const data = await Promise.all(promises)
  const context = {}

  const html = renderToString(
    <StaticRouter location={originalUrl} context={context}>
      <App data={data[0]} />
    </StaticRouter>
  )

  if (context.url && context.status) {
    return res.redirect(context.status, context.url)
  } else if (context.url) {
    return res.redirect(302, context.url)
  }

  // default to 200 OK
  return res.send(template(html, data[0])).status(context.status || 200)
}
