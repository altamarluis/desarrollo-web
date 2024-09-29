import { pool } from "../database/connection.js";

const findAll = async() => {
    const { rows } = await pool.query("SELECT * FROM Users");
    return rows;
}

const getUser = async(username, password) => {
    const query = "SELECT user_id, role, username, email, nationality, location FROM Users WHERE username = $1 AND password = $2"
    const {rows} = await pool.query(query, [username, password]);
    return rows[0];
}

const createUser = async(user_id, role, username, email, nationality, password, location) => {
    const query = "INSERT INTO Users (user_id, role, username, email, nationality, password, location) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_id) DO NOTHING RETURNING user_id, role, username, email, nationality, location"
    const {rows} = await pool.query(query, [user_id, role, username, email, nationality, password, location]);
    return rows[0];
}

const updateUser = async(user_id, newUser_id, username, email, nationality, location) => {
    const query = "UPDATE Users SET user_id = COALESCE($2, user_id), username = COALESCE($3, username), email = COALESCE($4, email), nationality = COALESCE($5, nationality), location = COALESCE($6, location) WHERE user_id = $1 RETURNING user_id, username, email, nationality, location"
    const {rows} = await pool.query(query, [user_id, newUser_id, username, email, nationality, location]);
    return rows[0];
}

const updatePassword = async(user_id, password) => {
    const query = "UPDATE Users SET password = COALESCE($2, password) WHERE user_id = $1 RETURNING user_id, username, email, nationality, location"
    const {rows} = await pool.query(query,[user_id, password]);
    return rows[0]
}

const deleteUser = async(user_id) => {
    const query = "DELETE FROM Users WHERE user_id = $1 RETURNING user_id"
    const {rows} = await pool.query(query, [user_id])
    return rows[0];
}





export const unoModel = {
    findAll,
    getUser,
    createUser,
    updateUser,
    updatePassword,
    deleteUser,
};