import { sequelize } from "./models";
import { Umzug, SequelizeStorage } from "umzug";

export const runMigrations = async () => {
  try {
    // Create a new Umzug instance with the correct context
    const umzug = new Umzug({
      migrations: { glob: "src/migrations/*.js" },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    console.log("Starting migration process...");

    // Run the migrations
    await umzug.up();

    console.log("Migrations are up to date!");
  } catch (error) {
    console.error(
      "Failed to connect to the database or run migrations:",
      error
    );
    process.exit(1);
  }
};
