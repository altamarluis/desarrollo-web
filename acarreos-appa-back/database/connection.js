import pkg from 'mysql2/promise'; // Importa el paquete mysql2 con soporte para promesas
import "dotenv/config";

const { createPool } = pkg;

// Crea una nueva instancia de pool
export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306
});

// Para verificar la conexión
pool.getConnection()
  .then(connection => {
    console.log('Conexión a la base de datos MySQL exitosa');
    connection.release(); // Libera la conexión de nuevo al pool
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
