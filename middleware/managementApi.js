var axios = require('axios');

// // Get token
exports.getToken = async () => {
  const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    grant_type: 'client_credentials'
  })
  return response.data
}

exports.getUser = async (id) => {
  const token = await exports.getToken()
  const response = await axios(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `${token.token_type} ${token.access_token}`
    }
  });
  return response.data
}

exports.getUsers = async () => {
  const token = await exports.getToken()
  const response = await axios(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    headers: {
      'content-type': 'application/json',
      authorization: `${token.token_type} ${token.access_token}`
    }
  });
  return response.data
}
