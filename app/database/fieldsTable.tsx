import db from './db';

export const getFields = async () => {
    const fields:any = await db.getAllAsync('SELECT * FROM fields');
    return fields;
}

export const addField = (name: string, location: string, totalTrees: number, size: number, description: string) => {
    db.execAsync(
        `
        INSERT INTO fields (name, location, total_trees, size, description)
        VALUES ('${name}', '${location}', ${totalTrees}, ${size}, '${description}');
        `
    );
}

export const getField = async (id: number) => {
    const field:any = await db.execAsync(`SELECT * FROM fields WHERE id = ${id}`);
    return field;
}

export const updateField = (id: number, name: string, location: string, totalTrees: number, size: number, description: string) => {
    db.execAsync(
        `
        UPDATE fields
        SET name = '${name}', location = '${location}', total_trees = ${totalTrees}, size = ${size}, description = '${description}'
        WHERE id = ${id};
        `
    );
}

export const deleteField = (id: number) => {
    db.execAsync(
        `
        DELETE FROM fields
        WHERE id = ${id};
        `
    );
}