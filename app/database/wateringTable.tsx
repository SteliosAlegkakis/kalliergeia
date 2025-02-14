import db from './db';

export const addWatering = async (field_id: number, cost: number, cubic_meter: number, indication: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO watering (field_id, cost, cubic_meter, indication, date, comment)
        VALUES (${field_id}, ${cost}, ${cubic_meter}, ${indication}, '${date}', '${comment}');
        `
    );
}

export const getWatering = async (field_id: any) => {
    const watering = await db.getAllAsync(
        `
        SELECT * FROM watering WHERE field_id = ${field_id};
        `
    );
    return watering;
}

export const getWateringCost = async (field_id: any) => {
    const watering = await db.getAllAsync(
        `
        SELECT SUM(cost) as totalCost FROM watering WHERE field_id = ${field_id};
        `
    );
    return watering;
}

export const deleteWatering = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM watering WHERE task_id = ${task_id};
        `
    );
}

export const deleteWateringByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM watering WHERE field_id = ${field_id};
        `
    );
}