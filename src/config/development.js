export default {
  env: "development",
  nodePort: 8080,
  mongoUrl: "mongodb://localhost:27017/chatty",
  jwtSecret: "oxJWWSjUKC",
  basicAuth: {
    admin: "admin",
  },
  debug: true,
};
