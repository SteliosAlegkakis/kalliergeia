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

export const getSprayingCost = async (field_id: any) => {
    const spraying = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM spraying WHERE field_id = ${field_id};
        `
    );
    return spraying;
}

export const getSprayingCostTotal = async () => {
    const spraying = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM spraying;
        `
    );
    return spraying;
}

export const deleteSpraying = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM spraying WHERE task_id = ${task_id};
        `
    );
}

export const deleteSprayingByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM spraying WHERE field_id = ${field_id};
        `
    );
}