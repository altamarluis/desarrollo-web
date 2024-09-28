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


export const dosModel = {
    findAll,
    updateParams,
};