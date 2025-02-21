import db from './db';

export const addHarvest = async (field_id: number, cost: number, sacks: number, date: string, year: number, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO harvest (field_id, cost, sacks, date, year, comment)
        VALUES (${field_id}, ${cost}, ${sacks}, '${date}', ${year}, '${comment}');
        `
    );
}

export const getHarvest = async (field_id: any, year: number) => {
    const harvest = await db.getAllAsync(
        `
        SELECT * FROM harvest WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return harvest;
}

export const getHarvestCost = async (field_id: any, year: number) => {
    const harvest = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM harvest WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return harvest;
}

export const getHarvestCostTotal = async (year: number) => {
    const harvest = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM harvest WHERE year = ${year};
        `
    );
    return harvest;
}

export const getTotalSacks = async (field_id: any, year: number) => {
    const sacks = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(sacks), 0) as totalSacks FROM harvest WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return sacks;
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