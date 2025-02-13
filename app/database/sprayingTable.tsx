import db from './db';

export const addSpraying = async (field_id: number, cost: number, name: string, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO spraying (field_id, cost, name, date, comment)
        VALUES (${field_id}, ${cost}, '${name}', '${date}', '${comment}');
        `
    );
}

export const getSpraying = async (field_id: any) => {
    const spraying = await db.getAllAsync(
        `
        SELECT * FROM spraying WHERE field_id = ${field_id};
        `
    );
    return spraying;
}