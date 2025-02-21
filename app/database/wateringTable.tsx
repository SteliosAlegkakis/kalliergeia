import db from './db';

export const addWatering = async (field_id: number, cost: number, cubic_meter: number, date: string, year: number, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO watering (field_id, cost, cubic_meter, date, year, comment)
        VALUES (${field_id}, ${cost}, ${cubic_meter}, '${date}', ${year}, '${comment}');
        `
    );
}

export const getWatering = async (field_id: any, year: number) => {
    const watering = await db.getAllAsync(
        `
        SELECT * FROM watering WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return watering;
}

export const getWateringCost = async (field_id: any, year: number) => {
    const watering = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM watering WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return watering;
}

export const getWateringCostTotal = async (year: number) => {
    const watering = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM watering; WHERE year = ${year};
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