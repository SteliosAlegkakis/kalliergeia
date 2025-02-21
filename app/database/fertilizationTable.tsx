import db from './db';

export const addFertilization = async (field_id: number, cost: number, name: string, date: string, year: number, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO fertilization (field_id, cost, name, date, year, comment)
        VALUES (${field_id}, ${cost}, '${name}', '${date}', ${year}, '${comment}');
        `
    );
}

export const getFertilization = async (field_id: any, year: number) => {
    const fertilization = await db.getAllAsync(
        `
        SELECT * FROM fertilization WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return fertilization;
}

export const getFertilizationCost = async (field_id: any, year: number) => {
    const fertilization = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM fertilization WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return fertilization;
}

export const getFertilizationCostTotal = async (year: number) => {
    const fertilization = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM fertilization WHERE year = ${year};
        `
    );
    return fertilization;
}

export const deleteFertilization = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM fertilization WHERE task_id = ${task_id};
        `
    );
}

export const deleteFertilizationByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM fertilization WHERE field_id = ${field_id};
        `
    );
}