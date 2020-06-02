import fetch from 'isomorphic-fetch'

const config = {
  server: 'https://cat-fact.herokuapp.com'
}

export const setServer = (server) => {
  config.server = server
}

export const getRandomFact = () => {
  return fetch(`${config.server}/facts/random`).then((x) => x.json())
}

export const getFact = (id) => {
  return fetch(`${config.server}/facts/${id}`).then((x) => x.json())
}
