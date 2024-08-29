import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentForm, ObjectForm, MovingForm } from '../components/OrderTypes.js'
import '../styles/OrderView.css';
import { FaArrowLeft } from 'react-icons/fa';
import { UserContext } from '../services/userContext';


const SolicitarServicio = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [serviceType, setServiceType] = useState('documento');
  const [cost, setCost] = useState(0.0);
  const [documentData, setDocumentData] = useState({
    value: 0,
    weight: 0,
    date: '',
    cityOfOrigin: '',
    cityOfDestiny:'',
    addressOfOrigin: '',
    addressOfDestiny: ''
  });
  const [objectData, setObjectData] = useState({
    value: 0,
    weight: 0,
    date: '',
    width: 0,
    height:0,
    length:0,
    cityOfOrigin: '',
    cityOfDestiny:'',
    addressOfOrigin: '',
    addressOfDestiny: ''
  });
  const [movingData, setMovingData] = useState({
    value: 0,
    size: '',
    date: '',
    cityOfOrigin: '',
    cityOfDestiny:'',
    addressOfOrigin: '',
    addressOfDestiny: '',
  });

  const handleDocumentInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData(prev => ({ ...prev, [name]: value }));
  };

  const handleObjectInputChange = (e) => {
    const { name, value } = e.target;
    setObjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleMovingInputChange = (e) => {
    const { name, value } = e.target;
    setMovingData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCost = () => {
    let calculatedCost = 0;
    let distance =  2;
    switch (serviceType) {
      case 'documento':
        calculatedCost = (distance * 2) + (documentData.value * 0.3) + (documentData.weight * 0.05);
        break;
      case 'objeto':
        calculatedCost = (distance * 2) + (objectData.value * 0.2) + (objectData.weight * 0.1) + (objectData.width * objectData.height * objectData.length * 0.01);
        break;
      case 'mudanza':
        if (movingData.size.value === 'small') calculatedCost = (distance * 2) + movingData.value * 0.3 + 20;
        else if (movingData.size.value === 'medium') calculatedCost = (distance * 2) + movingData.value * 0.3 + 35;
        else if (movingData.size.value === 'large') calculatedCost = (distance * 2) + movingData.value * 0.3 + 50;
        else calculatedCost = (distance * 2) + movingData.value * 0.3;
        break;
      default:
        calculatedCost = 0;
    }
    setCost(calculatedCost);
  };

  useEffect(() => {
    calculateCost();
  }, [serviceType, documentData, objectData, movingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) alert("Pedido Solicitado")
    else navigate('/login')
  };

  return (
    <div className="solicitar-servicio">
      <button className="back-button flex"><FaArrowLeft className='pr-1 m-1'/><p className='text-base'>Regresar</p></button>
      <h2 className='font-bold'>Cotizar servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="service-type">
          <h4 className='font-bold '>Selecciona el tipo de servicio</h4>
          <div className="service-buttons">
            <button
              type="button"
              className={serviceType === 'documento' ? 'active' : 'text-xs'}
              onClick={() => setServiceType('documento')}
            >
              <p className='text-sm'>Documento</p>
            </button>
            <button
              type="button"
              className={serviceType === 'objeto' ? 'active' : ''}
              onClick={() => setServiceType('objeto')}
            >
              <p className='text-sm'>Objeto</p>
            </button>
            <button
              type="button"
              className={serviceType === 'mudanza' ? 'active' : ''}
              onClick={() => setServiceType('mudanza')}
            >
              <p className='text-sm'>Mudanza</p>
            </button>
          </div>
        </div>
        
        {serviceType === 'documento' && <DocumentForm onChange={handleDocumentInputChange}/>}
        {serviceType === 'objeto' && <ObjectForm onChange={handleObjectInputChange}/>}
        {serviceType === 'mudanza' && <MovingForm onChange={handleMovingInputChange} movingData={movingData.size} setMovingData={setMovingData}/>}

        <div className="final-row">
            <div className="form-group">
                <label>Costo:</label>
                <input className='costo' type="text" value={`$ ${cost.toFixed(1)}`} readOnly disabled/>
            </div>    
            <button type="submit" className="confirm-button mt-1 bg-[#00C853] h-10 p-2 rounded-md"><p className='text-sm text-black font-bold'>Solicitar Servicio</p></button>
        </div>
      </form>
    </div>
  );
};

export default SolicitarServicio;