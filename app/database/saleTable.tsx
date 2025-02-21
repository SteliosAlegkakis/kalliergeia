import db from './db';

export const addSale = async(oil: number, pricePerKilo: number, total: number, date: string, year: number, comment: string) => {
    await db.execAsync(
        `
        INSERT INTO sale (oil_kg, price_per_kilo, total, date, year, comment)
        VALUES (${oil}, ${pricePerKilo}, ${total}, '${date}', ${year}, '${comment}');
        `
    );
}

export const getSales = async (year: number) => {
    const sale = await db.getAllAsync(
        `
        SELECT * FROM sale WHERE year = ${year};
        `
    );
    return sale;
}

export const getTotalIncome = async (year: number) => {
    const sale = await db.getAllAsync(
        `
        SELECT IFNULL(SUM(total), 0) as totalIncome FROM sale WHERE year = ${year};
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