import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import config from "../config/config";
import { Config } from "../types/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const dbConfig: Config = config;
const selectedConfig = dbConfig[env];
if (!selectedConfig) {
  throw new Error(`Config for environment '${env}' not found`);
}

interface DB {
  [key: string]: any;
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
}

const db: DB = {};

let sequelize: Sequelize;
if (selectedConfig.use_env_variable) {
  sequelize = new Sequelize(
    process.env[selectedConfig.use_env_variable]!,
    selectedConfig
  );
} else {
  sequelize = new Sequelize(
    selectedConfig.database as string,
    selectedConfig.username as string,
    selectedConfig.password as string,
    {
      host: selectedConfig.host,
      dialect: selectedConfig.dialect,
    }
  );
}

// Check the database connection
async function checkDatabaseConnection() {
  try {
    // await createDatabaseIfNotExists()
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
checkDatabaseConnection();

async function loadModels() {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );

  for (const file of modelFiles) {
    const model = await import(path.join(__dirname, file));
    db[model.default.name] = model.default;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

loadModels().then(() => {
  console.log("Models loaded successfully.");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
