import React from 'react';
import FormField from './FormField';
import Select from 'react-select';
import { FaMoneyBillWave, FaWeight, FaCalendarAlt, FaCity, FaMapMarkerAlt, FaRulerHorizontal, FaRulerVertical, FaRuler } from 'react-icons/fa';

export const DocumentForm = ({ onChange }) => (
  <div className="service-form">
    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="value"
        label="Valor declarado"
        type="text"
        value={null}
        placeholder="En piezas de oro"
        onChange={onChange}
        error={null}
        icon={FaMoneyBillWave}
      />
      <FormField
        name="weight"
        label="Peso"
        type="text"
        value={null}
        placeholder="Máximo 2kg"
        onChange={onChange}
        error={null}
        icon={FaWeight}
      />
      <FormField
        name="date"
        label="Fecha del Servicio"
        type="date"
        value={null}
        placeholder=""
        onChange={onChange}
        error={null}
        icon={FaCalendarAlt}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin"
        label="Ciudad de Origen"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de origen"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
      <FormField
        name="destiny"
        label="Ciudad de Destino"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de destino"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin address"
        label="Dirección de Origen"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
      <FormField
        name="destiny address"
        label="Dirección de Destino"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
    </div>
  </div>
);

export const ObjectForm = ({ onChange }) => (
  <div className="service-form">
    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="value"
        label="Valor declarado"
        type="text"
        value={null}
        placeholder="En piezas de oro"
        onChange={onChange}
        error={null}
        icon={FaMoneyBillWave}
      />
      <FormField
        name="weight"
        label="Peso"
        type="text"
        value={null}
        placeholder="Máximo 2kg"
        onChange={onChange}
        error={null}
        icon={FaWeight}
      />
      <FormField
        name="date"
        label="Fecha del Servicio"
        type="date"
        value={null}
        placeholder=""
        onChange={onChange}
        error={null}
        icon={FaCalendarAlt}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="width"
        label="Ancho"
        type="text"
        value={null}
        placeholder="Máximo 500cm"
        onChange={onChange}
        error={null}
        icon={FaRulerHorizontal}
      />
      <FormField
        name="height"
        label="Alto"
        type="text"
        value={null}
        placeholder="Máximo 500cm"
        onChange={onChange}
        error={null}
        icon={FaRulerVertical}
      />
      <FormField
        name="length"
        label="Largo"
        type="text"
        value={null}
        placeholder="Máximo 500cm"
        onChange={onChange}
        error={null}
        icon={FaRuler}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin"
        label="Ciudad de Origen"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de origen"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
      <FormField
        name="destiny"
        label="Ciudad de Destino"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de destino"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin address"
        label="Dirección de Origen"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
      <FormField
        name="destiny address"
        label="Dirección de Destino"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
    </div>
  </div>
);

export const MovingForm = ({ onChange, movingData, setMovingData }) => (
  <div className="service-form">
    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="value"
        label="Valor declarado"
        type="text"
        value={null}
        placeholder="En piezas de oro"
        onChange={onChange}
        error={null}
        icon={FaMoneyBillWave}
      />
      <div className="form-group">
        <label htmlFor="select">Tamaño de Bisonte</label>
        <div className="input-group">
          <Select
            id="select"
            name="size"
            options={[
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ]}
            value={movingData}
            onChange={(selectedOption) => setMovingData(prev => ({ ...prev, size: selectedOption }))}
            placeholder="Selecciona"
          />
        </div>
      </div>
      <FormField
        name="date"
        label="Fecha del Servicio"
        type="date"
        value={null}
        placeholder=""
        onChange={onChange}
        error={null}
        icon={FaCalendarAlt}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin"
        label="Ciudad de Origen"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de origen"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
      <FormField
        name="destiny"
        label="Ciudad de Destino"
        type="text"
        value={null}
        placeholder="Ingresa la ciudad de destino"
        onChange={onChange}
        error={null}
        icon={FaCity}
      />
    </div>

    <div className="sm:form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        name="origin address"
        label="Dirección de Origen"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
      <FormField
        name="destiny address"
        label="Dirección de Destino"
        type="text"
        value={null}
        placeholder="En coordenadas"
        onChange={onChange}
        error={null}
        icon={FaMapMarkerAlt}
      />
    </div>
  </div>
);
