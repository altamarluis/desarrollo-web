import { cuatroModel } from "../models/cuatro.model.js";
import { dosModel } from "../models/dos.model.js";


const createOrder = async(req,res) => {
    try {
        const { user_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, status = "Inactivo", tracking_code } = req.body;
        const availableBison = await dosModel.findAvailableBison();
        if (!availableBison) {
            return res.status(400).json({ error: 'No hay bisontes disponibles en este momento.' });
        }
        const transporter_id = availableBison.transporter_id;
        const estado = "En tránsito";
        await dosModel.updateBisonStatus(availableBison.transporter_id, estado)


        const response = await cuatroModel.createOrder(user_id, transporter_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, status, tracking_code);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const updateOrderStatus = async(req,res) => {
    try {
        const { order_id, estado } = req.body;
        const response = await cuatroModel.updateStatus(order_id, estado);
        if (estado == "Entregado" || estado == "Inactivo"){
            const order = await cuatroModel.findOrderById(order_id);
            const bison = await dosModel.findBison(order.transporter_id);
            const estado = "Disponible";
            await dosModel.updateBisonStatus(bison.bison_id,estado)
        }
        res.json(response)
    } catch (error) {
        console.log(error);
    }
    
}


const getOrderStatus = async(req,res) => {
    try {
        const { tracking_code } = req.body;
        const response = await cuatroModel.findOrderByCode(tracking_code);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const getClientOrders = async(req,res) => {
    try {
        const { user_id } = req.body;
        const response = await cuatroModel.findOrdersByUser(user_id);

        const formattedOrders = response.map(order => {
        const { tracking_code, status, last_updated_date, declared_value, ...otherDetails } = order;
        const description = `Pedido de tipo ${otherDetails.order_type} con origen en ${otherDetails.origin_address} y destino en ${otherDetails.destination_address}, programado el ${otherDetails.service_date}.`;

        return {
            tracking_code,
            status,
            last_updated_date,
            declared_value,
            description
        };
    });
        res.json(formattedOrders);
    } catch (error) {
        console.log(error);
    }
}

const getTransporterOrders = async(req,res) => {
    try {
        const { transporter_id } = req.body;
        const response = await cuatroModel.findOrdersByTransporter(transporter_id);
        const formattedOrders = response.map(order => {
            const { user_id, tracking_code, status, last_updated_date, declared_value, ...otherDetails } = order;
            const description = `Pedido de tipo ${otherDetails.order_type} con origen en ${otherDetails.origin_address} y destino en ${otherDetails.destination_address}, programado el ${otherDetails.service_date}.`;
    
            return {
                user_id,
                tracking_code,
                status,
                last_updated_date,
                declared_value,
                description
            };
        });
            res.json(formattedOrders);
    } catch (error) {
        console.log(error);
    }
}

export const cuatroController = {
    getOrderStatus,
    getClientOrders,
    getTransporterOrders,
    createOrder,
    updateOrderStatus,
};
