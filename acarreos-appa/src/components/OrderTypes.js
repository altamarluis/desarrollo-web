import React from 'react';
import FormField from './FormField';
import '../styles/OrderView.css';
import { FaMoneyBillWave, FaWeight, FaCalendarAlt, FaCity, FaMapMarkerAlt } from 'react-icons/fa';

export const DocumentForm = () => (
  <div className="service-form">
    <div className="form-row">
      <FormField
        name="declared value"
        label="Valor declarado"
        type="text"
        value={null}
        placeholder="En monedas de oro"
        onChange={null}
        error={null}
        icon={FaMoneyBillWave}

      />
      <FormField
        name="weight"
        label="Peso"
        type="text"
        value={null}
        placeholder="Máximo 2kg"
        onChange={null}
        error={null}
        icon={FaWeight}
      />

      <FormField
        name="date"
        label="Fecha del Servicio"
        type="date"
        value={null}
        placeholder=""
        onChange={null}
        error={null}
        icon={FaCalendarAlt}
      />

      
    </div>
    <div className="form-row">

      <FormField
        name="origin"
        label="Ciudad de Origen"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de origen"
        onChange={null}
        error={null}
        icon={FaCity}
      />

      <FormField
        name="destiny"
        label="Ciudad de Destino"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de destino"
        onChange={null}
        error={null}
        icon={FaCity}
      />
    </div>
    <div className="form-row">
      <FormField
        name="origin address"
        label="Dirección de Origen"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={null}
        error={null}
        icon={FaMapMarkerAlt}
      />

      <FormField
        name="destiny address"
        label="Dirección de Destino"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={null}
        error={null}
        icon={FaMapMarkerAlt}
      />
    </div>
  </div>
);

export const ObjectForm = () => (
  <div className="service-form">
    {/* Campos para objeto */}
    <p>Formulario para Objeto (campos a definir)</p>
  </div>
);

export const MovingForm = () => (
  <div className="service-form">
    {/* Campos para mudanza */}
    <p>Formulario para Mudanza (campos a definir)</p>
  </div>
);