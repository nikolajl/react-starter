import express from 'express'
import http from 'http'
import logger from 'morgan'
import path from 'path'

import reactServer from './server-react-middleware'
import apiServer from './api/api'
import * as catProxy from './proxy/cat-proxy'

// Configuration ===============================================================
catProxy.setServer('https://cat-fact.herokuapp.com')
console.log('ENV: STATICDIR=', process.env.STATICDIR)
const port = process.env.PORT || 8080
const staticdir = process.env.STATICDIR || 'build'
const app = express()

// Apply middleware
app.use(logger('short'))
app.use(express.static(staticdir))
app.use('/api', apiServer)
app.use(reactServer)

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
http.createServer(app).listen(port, () => {
  console.log(`Express server started at: http://localhost:${port}/`) // eslint-disable-line no-console
})

export default app
