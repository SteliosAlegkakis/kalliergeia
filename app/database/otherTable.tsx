import db from './db';

export const addOther = async (field_id: number, cost: number, task_name: string, date: string, year: number, comment: string) => {
    try {
        await db.execAsync(
            `
            INSERT INTO other (field_id, task_name, cost, date, year, comment)
            VALUES (${field_id}, '${task_name}', ${cost}, '${date}', ${year}, '${comment}');
            `
        );
    } catch (error) {
        alert(error);
    }
}

export const getOther = async (field_id: any, year: number) => {
    const other = await db.getAllAsync(
        `
        SELECT * FROM other WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return other;
}

export const getOtherCost = async (field_id: any, year: number) => {
    const other = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM other WHERE field_id = ${field_id} AND year = ${year};
        `
    );
    return other;
}

export const getOtherCostTotal = async (year: number) => {
    const other = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(cost), 0) as totalCost FROM other WHERE year = ${year};
        `
    );
    return other;
}

export const deleteOther = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM other WHERE task_id = ${task_id};
        `
    );
}

export const deleteOtherByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM other WHERE field_id = ${field_id};
        `
    );
}