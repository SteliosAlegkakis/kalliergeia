import db from './db';

export const addHarvest = async (field_id: number, cost: number, sacks: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO harvest (field_id, cost, sacks, date, comment)
        VALUES (${field_id}, ${cost}, ${sacks}, '${date}', '${comment}');
        `
    );
}

export const getHarvest = async (field_id: any) => {
    const harvest = await db.getAllAsync(
        `
        SELECT * FROM harvest WHERE field_id = ${field_id};
        `
    );
    return harvest;
}
