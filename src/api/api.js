import { Router } from 'express'
import { getRandomFact, getFact } from '../proxy/cat-proxy'
const apiServer = Router()

apiServer.get('/time', (req, res) => {
  res.json(new Date())
})

apiServer.get('/fact', async (req, res) => {
  const { text } = await getRandomFact()
  res.json(text)
})

apiServer.get('/fact/:id', async (req, res) => {
  const { id } = req.params
  const { text } = await getFact(id)
  res.json(text)
})

export default apiServer
