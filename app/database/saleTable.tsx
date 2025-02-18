import db from './db';

export const addSale = async(oil: number, pricePerKilo: number, total: number, date: string, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO sale (oil_kg, price_per_kilo, total, date, comment)
        VALUES (${oil}, ${pricePerKilo}, ${total}, '${date}', '${comment}');
        `
    );
}

export const getSales = async () => {
    const sale = await db.getAllAsync(
        `
        SELECT * FROM sale;
        `
    );
    return sale;
}

export const getTotalIncome = async () => {
    const sale = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(total), 0) as totalIncome FROM sale;
        `
    );
    return sale;
}

export const getOil = async () => {
    const sale = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(oil_kg), 0) as totalOil FROM sale;
        `
    );
    return sale;
}

export const deleteSale = async (sale_id: any) => {
    await db.execAsync(
        `
        DELETE FROM sale WHERE sale_id = ${sale_id};
        `
    );
}