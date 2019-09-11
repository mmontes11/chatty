export default {
  env: process.env.NODE_ENV,
  nodePort: process.env.NODE_PORT,
  mongoUrl: `${process.env.MONGO_URL}`,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  basicAuth: {
    [`${process.env.BASIC_AUTH_USER}`]: `${process.env.BASIC_AUTH_PASSWORD}`,
  },
  debug: process.env.DEBUG,
};
