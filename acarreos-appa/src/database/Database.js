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
  },
  orders: [
    {
      id: '102932138',
      clientName: 'Aang',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
      status: 'Inactivo',
      lastUpdate: '26/08/2024, 10:35:24 a. m.',
      value: 100.00
    },
    {
      id: '102342343',
      clientName: 'Soka',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
      status: 'En tránsito',
      lastUpdate: '22/08/2024, 02:45:12 p. m.',
      value: 100.00
    },
    {
      id: '102932139',
      clientName: 'Tio Iroh',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
      status: 'Entregado',
      lastUpdate: '21/08/2024, 09:07:34 a. m.',
      value: 200.00
    },
    {
      id: '102932140',
      clientName: 'Katara',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
      status: 'Retrasado',
      lastUpdate: '26/08/2024, 04:15:27 p. m.',
      value: 300.00
    },
    {
      id: '103230935',
      clientName: 'Principe Zuko',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
      status: 'Extraviado',
      lastUpdate: '27/08/2024, 11:19:45 a. m.',
      value: 300.00
    }
  ]
};

export const updateParameters = (newParameters) => {
  Database.parameters = { ...Database.parameters, ...newParameters };
};

export const dbDeleteUser = (userId) => {
  Database.users = Database.users.filter(user => user.id !== userId);
};

export const getOrderById = (id) => {
  return Database.orders.find(order => order.id === id);
};

  export default Database;