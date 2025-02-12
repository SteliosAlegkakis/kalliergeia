import db from './db';

export const addGrinding = async (field_id: number, olive_kg: number, oil_kg: number, oxide: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO grinding (field_id, olive_kg, oil_kg, oxide, date, comment)
        VALUES (${field_id}, ${olive_kg}, ${oil_kg}, ${oxide}, '${date}', '${comment}');
        `
    );
}