require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_DEV_URL",
    dialect: "postgres",
    logging: false,
    omitNull: true
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    native: true,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};
