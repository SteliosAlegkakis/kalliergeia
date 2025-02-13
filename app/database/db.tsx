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
            indication INTEGER NOT NULL,
            water_price REAL NOT NULL,
            description TEXT
        );
        `
    );

    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS watering (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id INTEGER NOT NULL,
            cost REAL NOT NULL,
            cubic_meter REAL NOT NULL,
            indication INTEGER NOT NULL,
            date TEXT NOT NULL,
            comment TEXT
        );
        `
    );

    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS fertilization (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id INTEGER NOT NULL,
            cost REAL NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            comment TEXT
        );
        `
    );

    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS spraying (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id INTEGER NOT NULL,
            cost REAL NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            comment TEXT
        );
        `
    );

    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS grinding (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id INTEGER NOT NULL,
            olive_kg REAL NOT NULL,
            oil_kg REAL NOT NULL,
            oxide REAL NOT NULL,
            date TEXT NOT NULL,
            comment TEXT
        );
        `
    );

    db.execSync(
        `
        CREATE TABLE IF NOT EXISTS harvest (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id INTEGER NOT NULL,
            cost REAL NOT NULL,
            sacks INTEGER NOT NULL,
            date TEXT NOT NULL,
            comment TEXT
        );
        `
    );
};

export default db;
