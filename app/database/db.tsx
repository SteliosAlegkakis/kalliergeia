import * as SQLite from 'expo-sqlite';

// Open or create the database
const db = SQLite.openDatabaseSync('app_database.db');

// Function to create all tables
export const setupDatabase = () => {
    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS fields (
            field_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            total_trees INTEGER NOT NULL,
            size REAL NOT NULL,
            description TEXT
        );
        `
    );
};

export default db;
