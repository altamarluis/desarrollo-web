# Uno

1. Obtener todos los usuarios (prueba).

Método: GET.

Ruta: /api/prueba.

Cuerpo de Solicitud:

No requiere cuerpo de solicitud.

Cuerpo de Respuesta (Ejemplo):

```json
[
  {
    "user_id": "123",
    "role": "client",
    "username": "john_doe",
    "email": "john@example.com",
    "nationality": "US",
    "location": "New York"
  },
  {
    "user_id": "124",
    "role": "transporter",
    "username": "jane_doe",
    "email": "jane@example.com",
    "nationality": "CA",
    "location": "Toronto"
  }
]
```

2. Iniciar Sesión

Método: POST

Ruta: /api/login

Cuerpo de Solicitud:

```json
{
  "username": "john_doe",
  "password": "mypassword"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "123",
  "role": "client",
  "username": "john_doe",
  "email": "john@example.com",
  "nationality": "US",
  "location": "New York"
}
```

3. Registrar Cliente

Método: POST

Ruta: /api/registerClient

Cuerpo de Solicitud:

```json
{
  "user_id": "123",
  "username": "john_doe",
  "email": "john@example.com",
  "nationality": "US",
  "password": "mypassword",
  "location": "New York"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "123",
  "role": "client",
  "username": "john_doe",
  "email": "john@example.com",
  "nationality": "US",
  "location": "New York"
}
```

4. Registrar Transportista

Método: POST

Ruta: /api/registerTransporter

Cuerpo de Solicitud:

```json
{
  "user_id": "124",
  "username": "jane_doe",
  "bisonname": "BisonExpress",
  "email": "jane@example.com",
  "nationality": "CA",
  "password": "mypassword",
  "location": "Toronto"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "124",
  "role": "transporter",
  "username": "jane_doe",
  "email": "jane@example.com",
  "nationality": "CA",
  "location": "Toronto"
}
```

5. Actualizar Usuario

Método: PATCH

Ruta: /api/updateUser

Cuerpo de Solicitud:

```json
{
  "user_id": "123",
  "newUser_id": "125",
  "username": "john_doe_updated",
  "email": "john_updated@example.com",
  "nationality": "CA",
  "location": "Toronto"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "125",
  "username": "john_doe_updated",
  "email": "john_updated@example.com",
  "nationality": "CA",
  "location": "Toronto"
}
```

6. Cambiar Contraseña

Método: PATCH

Ruta: /api/changePassword

Cuerpo de Solicitud:

```json
{
  "user_id": "123",
  "password": "newpassword123"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "123",
  "username": "john_doe",
  "email": "john@example.com",
  "nationality": "US",
  "location": "New York"
}
```

7. Eliminar Usuario

Método: DELETE

Ruta: /api/deleteUser/:user_id

Cuerpo de Solicitud:

No requiere cuerpo de solicitud. El `user_id` se pasa en la URL.

Cuerpo de Respuesta (Ejemplo):

```json
{
  "user_id": "123"
}
```

# Dos

1. Obtener Parámetros de Configuración

Método: GET

Ruta: /api/parameters

Cuerpo de Solicitud:

No requiere cuerpo de solicitud.

Cuerpo de Respuesta (Ejemplo):

```json
{
  "max_km_per_bison": 500,
  "bison_rest_days": 2,
  "distance_rate": 0.5,
  "weight_rate": 1.0,
  "declared_value_rate": 0.02,
  "medium_dimension_charge": 10,
  "large_dimension_charge": 20
}
```

2. Actualizar Parámetros de Negocio

Método: PATCH

Ruta: /api/updateParams

Cuerpo de Solicitud (Ejemplo):

```json
{
  "max_km_per_bison": 600,
  "bison_rest_days": 3,
  "distance_rate": 0.6,
  "weight_rate": 1.2,
  "declared_value_rate": 0.03,
  "medium_dimension_charge": 12,
  "large_dimension_charge": 25
}
Cuerpo de Respuesta (Ejemplo):

json
Copiar código
{
  "max_km_per_bison": 600,
  "bison_rest_days": 3,
  "distance_rate": 0.6,
  "weight_rate": 1.2,
  "declared_value_rate": 0.03,
  "medium_dimension_charge": 12,
  "large_dimension_charge": 25
}
```

3. Eliminar Bisonte

Método: DELETE

Ruta: /api/deleteBison/:bison_id

Cuerpo de Solicitud:

No requiere cuerpo de solicitud. El `bison_id` se pasa en la URL.

Cuerpo de Respuesta (Ejemplo):

```json
{
  "bison_id": "123"
}
```

4. Obtener Todos los Bisontes

Método: GET

Ruta: /api/bisons

Cuerpo de Solicitud:

No requiere cuerpo de solicitud.

Cuerpo de Respuesta (Ejemplo):

```json
[
  {
    "bison_id": "123",
    "transporter_id": "456",
    "status": "Disponible",
    "km_traveled": 200,
    "rest_end_date": null
  },
  {
    "bison_id": "124",
    "transporter_id": "457",
    "status": "En tránsito",
    "km_traveled": 350,
    "rest_end_date": "2024-10-05"
  }
]
```

# Tres

1. Obtener Todas las Ciudades

Método: GET

Ruta: /api/cities

Cuerpo de Solicitud:

No requiere cuerpo de solicitud.

Cuerpo de Respuesta (Ejemplo):

```json
[
  {
    "city_id": 1,
    "name": "Ciudad A"
  },
  {
    "city_id": 2,
    "name": "Ciudad B"
  }
]
```

2. Cotizar Pedido

Método: POST

Ruta: /api/getOrderCost

Cuerpo de Solicitud:

```json
{
  "origin_city_id": 1,
  "destination_city_id": 2,
  "serviceType": "mudanza",  // O puede ser 'documento' o 'objeto'
  "details": {
    "size": "large",  // Requerido para 'mudanza': ('small', 'medium', 'large')
    "weight": 50,     // Peso en kilogramos, requerido para 'documento' o 'objeto'
    "value": 1500,    // Valor declarado del objeto o mudanza
    "width": 150,     // Ancho del objeto (solo para 'objeto')
    "height": 200,    // Altura del objeto (solo para 'objeto')
    "lengthh": 300    // Longitud del objeto (solo para 'objeto')
  }
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "totalCost": 250.75
}
```

# Cuatro

1. Crear Pedido

Método: POST

Ruta: /api/createOrder

Cuerpo de Solicitud:

```json
{
  "user_id": "123",
  "origin_city_id": 1,
  "destination_city_id": 2,
  "origin_address": "Calle 123",
  "destination_address": "Calle 456",
  "service_date": "2024-10-01",
  "declared_value": 1500,
  "order_type": "mudanza",
  "status": "Inactivo",
  "tracking_code": "XYZ123"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "tracking_code": "XYZ123",
  "status": "Inactivo"
}
```

2. Actualizar Estado del Pedido

Método: PATCH

Ruta: /api/updateOrderStatus

Cuerpo de Solicitud:

```json
{
  "order_id": 123,
  "estado": "Entregado"
}
```

Cuerpo de Respuesta (Ejemplo):

```json
{
  "order_id": 123,
  "status": "Entregado"
}
```

3. Consultar Estado del Pedido por Código de Seguimiento

Método: GET

Ruta: /api/orderStatus?tracking_code=XYZ123

Cuerpo de Solicitud:

No requiere cuerpo de solicitud. El `tracking_code` se pasa como parámetro en la URL.

Cuerpo de Respuesta (Ejemplo):

```json
{
  "status": "En tránsito"
}
```

4. Consultar Pedidos de Cliente

```markdown
Método: GET

Ruta: /api/clientOrders?user_id=123

Cuerpo de Solicitud:

No requiere cuerpo de solicitud. El `user_id` se pasa como parámetro en la URL.

Cuerpo de Respuesta (Ejemplo):

```json
[
  {
    "tracking_code": "XYZ123",
    "status": "En tránsito",
    "last_updated_date": "2024-09-28",
    "declared_value": 1500,
    "description": "Pedido de tipo mudanza con origen en Calle 123 y destino en Calle 456, programado el 2024-10-01."
  }
]
```

5. Consultar Pedidos de Transportista

```markdown
Método: GET

Ruta: /api/transporterOrders?transporter_id=456

Cuerpo de Solicitud:

No requiere cuerpo de solicitud. El `transporter_id` se pasa como parámetro en la URL.

Cuerpo de Respuesta (Ejemplo):

```json
[
  {
    "user_id": "123",
    "tracking_code": "XYZ123",
    "status": "En tránsito",
    "last_updated_date": "2024-09-28",
    "declared_value": 1500,
    "description": "Pedido de tipo mudanza con origen en Calle 123 y destino en Calle 456, programado el 2024-10-01."
  }
]
