const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


// Create middleware for checking the JWT
module.exports =  jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://testada.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://testada.eu.auth0.com/`,
  algorithms: ['RS256']
});
