import { pool } from "../database/connection.js";

const findAll = async() => {
    const { rows } = await pool.query("SELECT * FROM BusinessRules WHERE rule_id = 1");
    return rows[0];
}

const updateParams = async(max_km_per_bison, bison_rest_days, distance_rate, weight_rate, declared_value_rate, medium_dimension_charge, large_dimension_charge) => {
    const query = "UPDATE BusinessRules SET max_km_per_bison = COALESCE($1, max_km_per_bison), bison_rest_days = COALESCE($2, bison_rest_days), distance_rate = COALESCE($3, distance_rate), weight_rate = COALESCE($4, weight_rate), declared_value_rate = COALESCE($5, declared_value_rate), medium_dimension_charge = COALESCE($6, medium_dimension_charge), large_dimension_charge = COALESCE($7, large_dimension_charge)  WHERE rule_id = 1 RETURNING max_km_per_bison, bison_rest_days, distance_rate, weight_rate, declared_value_rate, medium_dimension_charge, large_dimension_charge"
    const {rows} = await pool.query(query, [max_km_per_bison, bison_rest_days, distance_rate, weight_rate, declared_value_rate, medium_dimension_charge, large_dimension_charge]);
    return rows[0];
}

const createBison = async(name, transporter_id, status, km_traveled, rest_end_date) => {
    const query = "INSERT INTO Bisons (name, transporter_id, status, km_traveled, rest_end_date) VALUES ($1, $2, $3, $4, $5) RETURNING name, transporter_id, status, km_traveled, rest_end_date"
    const {rows} = await pool.query(query, [name, transporter_id, status, km_traveled, rest_end_date]);
    return rows[0];
}

const findBison = async(transporter_id) => {
    const query = "SELECT * FROM Bisons WHERE transporter_id = $1"
    const {rows} = await pool.query(query, [transporter_id]);
    return rows[0];
}


const updateBisonStatus = async(bison_id, estado) => {
    const query = "UPDATE Bisons SET status = $2 WHERE bison_id = $1 RETURNING bison_id"
    const {rows} = await pool.query(query, [bison_id, estado])
    return rows[0];
}   

const deleteBison = async(bison_id) => {
    const query = "DELETE FROM Bisons WHERE bison_id = $1 RETURNING bison_id"
    const {rows} = await pool.query(query, [bison_id])
    return rows[0];
}

const findAllBisons = async() => {
    const { rows } = await pool.query("SELECT * FROM Bisons");
    return rows[0];
}

const findAvailableBison = async() => {
    const { rows } = await pool.query("SELECT bison_id, transporter_id FROM Bisons WHERE status = 'Disponible' LIMIT 1;");
    return rows[0];
}




export const dosModel = {
    findAll,
    updateParams,
    createBison,
    deleteBison,
    findBison,
    findAllBisons,
    findAvailableBison,
    updateBisonStatus,
};