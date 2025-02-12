import db from './db';

export const addWatering = async (field_id: number, cost: number, cubic_meter: number, indication: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO watering (field_id, cost, cubic_meter, indication, date, comment)
        VALUES (${field_id}, ${cost}, ${cubic_meter}, ${indication}, '${date}', '${comment}');
        `
    );
}