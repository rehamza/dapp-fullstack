import dotenv from "dotenv";
dotenv.config();

// Define the list of supported dialects
const allowedDialects = [
  "mysql",
  "postgres",
  "sqlite",
  "mariadb",
  "mssql",
] as const;
export type Dialect = (typeof allowedDialects)[number];

const getDialect = (dialect: string | undefined): Dialect => {
  if (allowedDialects.includes(dialect as Dialect)) {
    return dialect as Dialect;
  }
  throw new Error(`Invalid DB_DIALECT provided: ${dialect}`);
};

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: getDialect(process.env.DB_DIALECT), // Validate the dialect
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: getDialect(process.env.DB_DIALECT), // Validate the dialect
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: getDialect(process.env.DB_DIALECT), // Validate the dialect
    use_env_variable: "DATABASE_URL",
  },
};

export default config;
