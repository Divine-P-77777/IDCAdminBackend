import jwt from 'express-jwt'; // Middleware to validate JWTs
import jwksRsa from 'jwks-rsa'; // Retrieve signing key from Auth0

// Middleware to validate the JWT token from Auth0
const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export default authMiddleware;
