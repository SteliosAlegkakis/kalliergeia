import db from './db';

export const getFields = async () => {
    const fields:any = await db.getAllAsync('SELECT * FROM fields');
    return fields;
}

export const addField = async (name: string, lat: number, lon: number, totalTrees: number, size: string, description: string) => {
    await db.execAsync(
        `
        INSERT INTO fields (name, lat, lon, total_trees, size, description)
        VALUES ('${name}', '${lat}', ${lon}, ${totalTrees}, '${size}', '${description}');
        `
    );
}

export const getField = async (id: any) => {
    const field:any = await db.getAllAsync(`SELECT * FROM fields WHERE field_id = ${id}`);
    return field;
}

export const getTotalTrees = async (id: any) => {
    const total_trees:any = await db.getAllAsync(`SELECT total_trees FROM fields WHERE field_id = ${id}`);
    return total_trees;
}

export const updateField = async (id: number, lat: number, lon: number, totalTrees: number, size: string, description: string) => {
    await db.execAsync(
        `
        UPDATE fields
        SET lat = '${lat}', lon = '${lon}', total_trees = ${totalTrees}, size = ${size}, description = '${description}'
        WHERE field_id = ${id};
        `
    );
}

export const deleteField = async (id: any) => {
    await db.execAsync(
        `
        DELETE FROM fields
        WHERE field_id = ${id};
        `
    );
}