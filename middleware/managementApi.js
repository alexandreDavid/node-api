var axios = require('axios');

// // Get token
exports.getToken = async () => {
  // var options = {
  //   url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  //   headers: { 'content-type': 'application/json' },
  //   body: {
  //     client_id: process.env.AUTH0_CLIENT_ID,
  //     client_secret: process.env.AUTH0_CLIENT_SECRET,
  //     audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  //     grant_type: 'client_credentials'
  //   },
  //   json: true };

    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      client_id: '4RiQEDwfV7hgjkEmaBrvo2g0ia7ZbR2B' || process.env.AUTH0_CLIENT_ID,
      client_secret: '_SpWAlZlX2hC8F5FLK9vrbBp1ho6DPF57ys6TE4OKh3M9TzdIu_pSdXQR3QYAa4N' || process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    })
    return response.data
  // });
}

exports.getUser = async (id) => {
  const token = await exports.getToken()

  // const options = {
  //   method: 'get',
  //   headers: {
  //     'content-type': 'application/json',
  //     authorization: `${token.token_type} ${token.access_token}`
  //   },
  //   url: `https://${process.env.AUTH0_DOMAIN}/api/v2/user/${id}`,
  // };
  const response = await axios(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `${token.token_type} ${token.access_token}`
    }
  });
  return response.data

  //   var options = {
  //     url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  //     headers: { 
  //       'content-type': 'application/json',
  //       authorization: `${token.token_type} ${token.access_token}`
  //     },
  //     body: {
  //       client_id: process.env.AUTH0_CLIENT_ID,
  //       client_secret: process.env.AUTH0_CLIENT_SECRET,
  //       audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  //       grant_type: 'client_credentials'
  //     },
  //     json: true };

  //   request.post(options, function (error, _resp, body) {
  //     if (error) {
  //       throw new Error(error);
  //     }
  //     callback(body);
  //   });
  // }
}