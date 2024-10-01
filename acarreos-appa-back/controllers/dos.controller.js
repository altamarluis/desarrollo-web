import { dosModel } from "../models/dos.model.js";

const getAll = async(_, res) => {
    try {
        const response = await dosModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const update = async (req, res) => {
    try {
        const { max_km_per_bison, bison_rest_days, distance_rate, weight_rate, declared_value_rate, medium_dimension_charge, large_dimension_charge } = req.body;
        const response = await dosModel.updateParams(max_km_per_bison, bison_rest_days, distance_rate, weight_rate, declared_value_rate, medium_dimension_charge, large_dimension_charge);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteBison = async (req, res) => {
    try {
        const { bison_id } = req.params;
        const response = await dosModel.deleteBison(bison_id);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getAllBisons = async(_, res) => {
    try {
        const response = await dosModel.findAllBisons();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

export const dosController = {
    getAll,
    update,
    deleteBison,
    getAllBisons,
};