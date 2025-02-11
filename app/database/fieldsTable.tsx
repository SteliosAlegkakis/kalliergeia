import db from './db';

export const getFields = async () => {
    const fields:any = await db.getAllAsync('SELECT * FROM fields');
    return fields;
}

export const addField = async (name: string, location: string, totalTrees: number, size: number, indication: number, description: string) => {
    await db.execAsync(
        `
        INSERT INTO fields (name, location, total_trees, size, indication, description)
        VALUES ('${name}', '${location}', ${totalTrees}, ${size}, ${indication}, '${description}');
        `
    );
}

export const getField = async (id: any) => {
    const field:any = await db.getAllAsync(`SELECT * FROM fields WHERE field_id = ${id}`);
    return field;
}

export const updateField = async (id: number, location: string, totalTrees: number, size: number, indication:number, description: string) => {
    await db.execAsync(
        `
        UPDATE fields
        SET location = '${location}', total_trees = ${totalTrees}, size = ${size}, indication = ${indication}, description = '${description}'
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