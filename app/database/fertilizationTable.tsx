import db from './db';

export const addFertilization = async (field_id: number, cost: number, name: string, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO fertilization (field_id, cost, name, date, comment)
        VALUES (${field_id}, ${cost}, '${name}', '${date}', '${comment}');
        `
    );
}