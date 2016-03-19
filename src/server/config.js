/**
 * Config Holds MongoDB URI, Port, and Secret for JWT
 */
const config = {
  mongoDB_URI: "mongodb://localhost:27017/dartboard",
  port: process.env.PORT || '8080'
}

export default config;
