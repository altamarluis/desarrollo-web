import { pool } from "../database/connection.js";

const createOrder = async(user_id, transporter_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, status, tracking_code) => {
    const query = "INSERT INTO Users (user_id, transporter_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, status, tracking_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 RETURNING tracking_code, status)"
    const {rows} = await pool.query(query, [user_id, transporter_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, status, tracking_code]);
    return rows[0];
}

const updateStatus = async(order_id, estado) => {
    const query = "UPDATE Orders SET status = $2 WHERE order_id = $1 RETURNING *"
    const { rows } = await pool.query(query, [order_id, estado]);
    return rows[0];
}

const findOrderById = async(order_id) => {
    const query = "SELECT * FROM Orders WHERE order_id = $1"
    const {rows} = await pool.query(query, [order_id]);
    return rows[0];
}


const findOrderByCode = async(tracking_code) => {
    const query = "SELECT status FROM Orders WHERE tracking_code = $1"
    const {rows} = await pool.query(query, [tracking_code]);
    return rows[0];
}

const findOrdersByUser = async(user_id) => {
    const query = "SELECT * FROM Orders WHERE user_id = $1"
    const {rows} = await pool.query(query, [user_id]);
    return rows;
}

const findOrdersByTransporter = async(transporter_id) => {
    const query = "SELECT * FROM Orders WHERE transporter_id = $1"
    const {rows} = await pool.query(query, [transporter_id]);
    return rows;
}


export const cuatroModel = {
    findOrderById,
    findOrderByCode,
    findOrdersByUser,
    findOrdersByTransporter,
    createOrder,
    updateStatus,
};