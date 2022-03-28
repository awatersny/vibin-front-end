import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/genres`

function create(genre) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(genre),
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export {
  create
}