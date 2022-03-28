import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/instruments`

function create(instrument) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(instrument),
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export {
  create
}