import { getFact, getRandomFact } from './proxy/cat-proxy'

//import { catFact } from './react/pages/AsyncExample.serverdata'

const routes = {
  '/hello': () => ({ name: 'Server' }),
  '/async': () => getRandomFact().then(({ text }) => 'server says:' + text),
  '/async/:id': ({ params: { id } }) =>
    getFact(id).then(({ text }) => 'server says:' + text)
}

export const loadData = (match) => {
  return match.path in routes ? routes[match.path](match) : undefined
}
