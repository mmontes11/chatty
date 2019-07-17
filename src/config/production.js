export default {
  env: process.env.NODE_ENV,
  nodePort: process.env.NODE_PORT,
  mongoUrl: `${process.env.MONGO_URL}`,
  jwtSecret: process.env.JWT_SECRET,
  debug: process.env.DEBUG,
};
