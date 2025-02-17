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

export const getHarvestCost = async (field_id: any) => {
    const harvest = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM harvest WHERE field_id = ${field_id};
        `
    );
    return harvest;
}

export const getHarvestCostTotal = async () => {
    const harvest = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM harvest;
        `
    );
    return harvest;
}

export const deleteHarvest = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM harvest WHERE task_id = ${task_id};
        `
    );
}

export const deleteHarvestByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM harvest WHERE field_id = ${field_id};
        `
    );
}