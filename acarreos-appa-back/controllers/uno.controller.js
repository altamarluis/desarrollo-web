import { dosModel } from "../models/dos.model.js";
import { unoModel } from "../models/uno.model.js";

const getAll = async(_, res) => {
    try {
        const response = await unoModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const login = async(req,res) => {
    try {
        const {username, password} = req.body;
        const response = await unoModel.getUser(username,password);
        res.json(response);
    } catch (error) {
        console.log(error);
    }

}

const registerClient = async(req,res) => {
    try {
        const role = "client";
        const { user_id, username, email, nationality, password, location = null} = req.body;
        const response = await unoModel.createUser(user_id, role,username,email,nationality,password,location);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const registerTransporter = async(req,res) => {
    try {
        const role = "transporter";
        const { user_id, username, bisonname, email, nationality, password, location = null} = req.body;
        const status = 'Disponible';
        const rest_end_date = null;
        const km_traveled = 0;
        const transporter_id = user_id;
        await dosModel.createBison(bisonname, transporter_id, status, km_traveled, rest_end_date);
        const response = await unoModel.createUser(user_id, role,username,email,nationality,password,location);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const update = async(req,res) => {
    try {
        const { user_id, newUser_id, username, email, nationality, location = null} = req.body;
        const response = await unoModel.updateUser(user_id, newUser_id, username, email, nationality, location);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async(req,res) => {
    try {
        const { user_id, password} = req.body;
        const response = await unoModel.updatePassword(user_id, password);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req,res) => {
    try {
        const { user_id } = req.body;
        const response = await unoModel.deleteUser(user_id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const unoController = {
    getAll,
    login,
    registerClient,
    registerTransporter,
    update,
    changePassword,
    deleteUser,
};