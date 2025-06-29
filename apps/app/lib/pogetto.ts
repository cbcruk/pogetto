import { ShareIntent } from 'expo-share-intent'

function getPogettoHeaders() {
  const headers = new Headers()
  const authorization = process.env.EXPO_PUBLIC_POGETTO_AUTHORIZATION

  if (!authorization) {
    throw new Error()
  }

  headers.append('Authorization', authorization)
  headers.append('Content-Type', 'application/json')

  return headers
}

export async function create({ webUrl }: ShareIntent) {
  if (!webUrl) {
    throw new Error()
  }

  return fetch(`${process.env.EXPO_PUBLIC_POGETTO_API_URL}/api/items`, {
    method: 'POST',
    headers: getPogettoHeaders(),
    body: JSON.stringify({
      url: webUrl,
    }),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
