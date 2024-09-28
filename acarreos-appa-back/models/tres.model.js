import { pool } from "../database/connection.js";

const findAllCities = async() => {
    const { rows } = await pool.query("SELECT * FROM Cities");
    return rows;
}

const findAllDistances = async() => {
    const { rows } = await pool.query("SELECT * FROM Distances");
    return rows;
}

export const tresModel = {
    findAllCities,
    findAllDistances,
};