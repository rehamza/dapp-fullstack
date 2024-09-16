import app from "./app";
import { runMigrations } from "./migrationRunner";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await runMigrations();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
