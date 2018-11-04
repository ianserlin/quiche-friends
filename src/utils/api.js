/* Api methods to call /functions */
import axios from 'axios'

let currentLocation
const IPSTACK_API_KEY = '7e9a9d0b23a735947e564fd07d356803'

export const getLocation = async () => {
  if (currentLocation) return currentLocation
  try {
    const response = await fetch(
      `http://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}&format=1`
    )
    currentLocation = await response.json()
  } catch (err) {
    console.error('Geolocating failed.')
    console.error(err)
  }
  return currentLocation
}

export const cloudinaryUpload = blob => {
  const formData = new FormData()
  formData.append('file', blob, 'selfie.jpg')
  formData.append('upload_preset', 'pynay5iz')
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/quiche-friends/upload',
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  }).then(response => {
    console.log('lambda response', JSON.stringify(response))
    const url = response.data.url
    return url
  })
}

export const clarifaiPredict = imageURL => {
  return fetch('/.netlify/functions/clarifai-predict', {
    body: imageURL,
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createProposition = data => {
  data.geolocation = currentLocation
  return fetch('/.netlify/functions/proposition-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createComment = data => {
  data.geolocation = currentLocation
  return fetch('/.netlify/functions/comment-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const createVote = data => {
  data.geolocation = currentLocation
  return fetch('/.netlify/functions/vote-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export const getProposition = () => {
  return fetch('/.netlify/functions/proposition-read').then(response => {
    return response.json()
  })
}

export const allPropositions = () => {
  return fetch('/.netlify/functions/propositions-all').then(response => {
    return response.json()
  })
}

export const searchPropositions = query => {
  return fetch('/.netlify/functions/propositions-search', {
    body: JSON.stringify(query),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}
