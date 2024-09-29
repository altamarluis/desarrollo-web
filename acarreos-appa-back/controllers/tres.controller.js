import { tresModel } from "../models/tres.model.js";
import { dosModel } from "../models/dos.model.js";

const getAllCities = async(_, res) => {
    try {
        const response = await tresModel.findAllCities();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const quoteOrder = async(req,res) => {

    try {
        const { origin_city_id, destination_city_id, serviceType, details } = req.body;
        const distances = await tresModel.findAllDistances();
        const parameters = await dosModel.findAll();
        
        // Clase para la cola de prioridad
        class PriorityQueue {
            constructor() {
                this.elementos = [];
            }

            enqueue(elemento, prioridad) {
                this.elementos.push({ elemento, prioridad });
                this.elementos.sort((a, b) => a.prioridad - b.prioridad);
            }

            dequeue() {
                return this.elementos.shift();
            }

            isEmpty() {
                return this.elementos.length === 0;
            }
        }


        // Función para construir el grafo
        function construirGrafo(distancias) {
            const grafo = {};
            for (const { origin_city_id, destination_city_id, distance } of distancias) {
                if (!grafo[origin_city_id]) grafo[origin_city_id] = {};
                if (!grafo[destination_city_id]) grafo[destination_city_id] = {};
                grafo[origin_city_id][destination_city_id] = distance;
                grafo[destination_city_id][origin_city_id] = distance; // Grafo no dirigido
            }
            return grafo;
        }

        // Algoritmo de Dijkstra
        function dijkstra(grafo, inicio, fin) {
            const distancias = {};
            const visitados = new Set();
            const queue = new PriorityQueue();

            // Inicializar distancias
            for (const ciudad in grafo) {
                distancias[ciudad] = Infinity;
            }
            distancias[inicio] = 0;
            queue.enqueue(inicio, 0);

            while (!queue.isEmpty()) {
                const { elemento: ciudadActual } = queue.dequeue();
                if (visitados.has(ciudadActual)) continue;
                visitados.add(ciudadActual);

                const vecinos = grafo[ciudadActual];

                for (const vecino in vecinos) {
                    const distancia = distancias[ciudadActual] + vecinos[vecino];
                    if (distancia < distancias[vecino]) {
                        distancias[vecino] = distancia;
                        queue.enqueue(vecino, distancia);
                    }
                }
            }

            return distancias[fin] === Infinity ? -1 : distancias[fin]; // Retorna -1 si no hay ruta
        }

        const grafo = construirGrafo(distances);
        const distanciaMasCorta = dijkstra(grafo, origin_city_id, destination_city_id);

        let baseFare = Number(distanciaMasCorta) * Number(parameters.distance_rate) + Number(details.value) * Number(parameters.declared_value_rate);
        let additionalCharges = 0;

        function calculateDimensionCharge(details, businessRules) {
            const dimensionCharge = (dim) => 
              dim < 100 ? 0 :
              dim < 300 ? businessRules.medium_dimension_charge :
              businessRules.large_dimension_charge;
          
            return Number(dimensionCharge(details.width)) + 
            Number(dimensionCharge(details.height)) + 
            Number(dimensionCharge(details.lengthh));
          }

        switch (serviceType) {
            case 'mudanza':
              additionalCharges += details.size === 'small' ? 20 : 
                                   details.size === 'medium' ? 35 : 50;
              break;
            case 'documento':
              additionalCharges += Number(details.weight) * Number(parameters.weight_rate);
              break;
            case 'objeto':
              additionalCharges += Number(details.weight) * Number(parameters.weight_rate);
              additionalCharges += Number(calculateDimensionCharge(details,parameters));
              break;
          }

        const totalFare = Number(baseFare) + Number(additionalCharges);


        res.json({ totalCost: totalFare });
    } catch (error){
        console.error(error);
    }

}

export const tresController = {
    getAllCities,
    quoteOrder,
};