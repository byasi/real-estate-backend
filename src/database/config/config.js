require('dotenv').config();

const {
    DATABASE_NAME,DATABASE_USER, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TEST
} = process.env;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres'
  },
  test: {
    username: DATABASE_USER,
    password: null,
    database: DATABASE_TEST,
    port: DATABASE_PORT,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
     },
  }
};
