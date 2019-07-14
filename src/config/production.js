export default {
  env: process.env.NODE_ENV,
  nodePort: process.env.NODE_PORT,
  mongoUrl: `${process.env.MONGO_URL}`,
  debug: process.env.DEBUG,
};
