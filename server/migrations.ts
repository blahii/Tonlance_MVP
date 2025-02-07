import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { pool } from "./db";

async function runMigrations() {
  const db = drizzle(pool);
  console.log("Running migrations...");
  
  try {
    // Create migrations folder if it doesn't exist
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migrations completed!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
});