import React, { useState } from 'react';
import FormField from '../components/FormField.js'
import { DocumentForm, ObjectForm, MovingForm } from '../components/OrderTypes.js'
import '../styles/OrderView.css';
import { FaArrowLeft } from 'react-icons/fa';

const SolicitarServicio = () => {
  const [serviceType, setServiceType] = useState('documento');
  const [cost, setCost] = useState(1000.0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la solicitud
    console.log('Servicio solicitado:', serviceType);
  };

  return (
    <div className="solicitar-servicio">
      <button className="back-button"><FaArrowLeft/> Regresar</button>
      <h2>Cotizar servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="service-type">
          <h4>Selecciona el tipo de servicio</h4>
          <div className="service-buttons">
            <button
              type="button"
              className={serviceType === 'documento' ? 'active' : ''}
              onClick={() => setServiceType('documento')}
            >
              Documento
            </button>
            <button
              type="button"
              className={serviceType === 'objeto' ? 'active' : ''}
              onClick={() => setServiceType('objeto')}
            >
              Objeto
            </button>
            <button
              type="button"
              className={serviceType === 'mudanza' ? 'active' : ''}
              onClick={() => setServiceType('mudanza')}
            >
              Mudanza
            </button>
          </div>
        </div>
        
        {serviceType === 'documento' && <DocumentForm />}
        {serviceType === 'objeto' && <ObjectForm />}
        {serviceType === 'mudanza' && <MovingForm />}

        <div className="final-row">
            <div className="form-group">
                <label>Costo:</label>
                <input className='costo' type="text" value={`$ ${cost.toFixed(1)}`} readOnly disabled/>
            </div>    
            <button type="submit" className="confirm-button">Solicitar Servicio</button>
        </div>
      </form>
    </div>
  );
};

export default SolicitarServicio;