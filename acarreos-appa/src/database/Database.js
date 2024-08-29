// Datos iniciales de ejemplo
const Database = {
  users: [
    {role:'admin', id: 1, username: 'Aang', email: 'aang@air.com', nationality: 'Nómadas Aire', password: 'AirBender123!', location: 'Templo Aire del Sur'},
    {role:'transport', id: 2, username: 'Katara', email: 'katara@water.com', nationality: 'Tribu Agua del Sur', password: 'WaterBending4Life!', location: 'Tribu Agua del Sur'},
    {role:'client', id: 3, username: 'Zuko', email: 'zuko@fire.com', nationality: 'Nación del Fuego', password: 'Honor4Ever!', location: 'Capital de la Nación del Fuego'}
  ],
  parameters: {
    maxKm: 500,
    restDays: 2,
    distanceFee: 0.5,
    weightFee: 0.1,
    valueFee: 0.01,
    mediumFee: 10,
    largeFee: 20
  }
};

export const updateParameters = (newParameters) => {
  Database.parameters = { ...Database.parameters, ...newParameters };
};

  export default Database;