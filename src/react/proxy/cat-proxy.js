import fetch from 'isomorphic-fetch'

export const getRandomFact = async () => {
  return await fetch(`/api/fact`).then((x) => x.json())
}

export const getFact = async (id) => {
  return await fetch(`/api/fact/${id}`).then((x) => x.json())
}
