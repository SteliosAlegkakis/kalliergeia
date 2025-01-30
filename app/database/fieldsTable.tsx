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