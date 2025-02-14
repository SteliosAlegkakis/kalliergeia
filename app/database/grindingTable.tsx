import db from './db';

export const addGrinding = async (field_id: number, olive_kg: number, oil_kg: number, oxide: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO grinding (field_id, olive_kg, oil_kg, oxide, date, comment)
        VALUES (${field_id}, ${olive_kg}, ${oil_kg}, ${oxide}, '${date}', '${comment}');
        `
    );
}

export const getGrinding = async (field_id: any) => {
    const grinding = await db.getAllAsync(
        `
        SELECT * FROM grinding WHERE field_id = ${field_id};
        `
    );
    return grinding;
}

export const getMedianOxide = async (field_id: any) => {
    const grinding = await db.getAllAsync(
        `
        SELECT COALESCE(AVG(oxide), '-') as medianOxide FROM grinding WHERE field_id = ${field_id};
        `
    );
    return grinding;
}

export const getTotalOil = async (field_id: any) => {
    const grinding = await db.getAllAsync(
        `
        SELECT COALESCE(SUM(oil_kg), 0) as totalOil FROM grinding WHERE field_id = ${field_id};
        `
    );
    return grinding;
}

export const deleteGrinding = async (task_id: number) => {
    await db.execAsync(
        `
        DELETE FROM grinding WHERE task_id = ${task_id};
        `
    );
}

export const deleteGrindingByField = async (field_id: any) => {
    await db.execAsync(
        `
        DELETE FROM grinding WHERE field_id = ${field_id};
        `
    );
}