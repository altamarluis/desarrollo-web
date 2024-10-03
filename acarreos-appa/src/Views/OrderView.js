import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentForm, ObjectForm, MovingForm } from '../components/OrderTypes.js'
import '../styles/OrderView.css';
import { FaArrowLeft } from 'react-icons/fa';
import { UserContext } from '../services/userContext';


const SolicitarServicio = () => {
  const navigate = useNavigate();
  const { user, quoteOrder, createOrder } = useContext(UserContext);
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
    lengthh:0,
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

  const calculateCost = async () => {
    let calculatedCost = 0;
    try {
      if (serviceType === 'documento') {
        const response = await quoteOrder({
          origin_city_id: documentData.cityOfOrigin,
          destination_city_id: documentData.cityOfDestiny,
          serviceType,
          details: documentData,
        });
        console.log(response);
        calculatedCost = response.totalCost;
      } else if (serviceType === 'mudanza') {
        const response = await quoteOrder({
          origin_city_id: movingData.cityOfOrigin,
          destination_city_id: movingData.cityOfDestiny,
          serviceType,
          details: movingData,
        });
        calculatedCost = response.totalCost;
      } else if (serviceType === 'objeto') {
        const response = await quoteOrder({
          origin_city_id: objectData.cityOfOrigin,
          destination_city_id: objectData.cityOfDestiny,
          serviceType,
          details: objectData,
        });
        calculatedCost = response.totalCost;
      }
    } catch (error) {
      console.log('Error al calcular el costo:', error);
    }
    setCost(calculatedCost);
  };


  useEffect(() => {
    calculateCost();
  }, [serviceType, documentData, objectData, movingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        let requestData = {};
        const trackingCode = Math.random().toString(36).substring(2, 12); // Genera un código de rastreo aleatorio
  
        // Configura los datos según el tipo de servicio
        if (serviceType === 'mudanza') {
          requestData = {
            user_id: user.user_id,
            origin_city_id: movingData.cityOfOrigin,
            destination_city_id: movingData.cityOfDestiny,
            origin_address: movingData.addressOfOrigin,
            destination_address: movingData.addressOfDestiny,
            service_date: movingData.date,
            declared_value: cost,
            order_type: serviceType,
            status: "Inactivo",
            tracking_code: trackingCode,
          };
        } else if (serviceType === 'objeto') {
          requestData = {
            user_id: user.user_id,
            origin_city_id: objectData.cityOfOrigin,
            destination_city_id: objectData.cityOfDestiny,
            origin_address: objectData.addressOfOrigin,
            destination_address: objectData.addressOfDestiny,
            service_date: objectData.date,
            declared_value: cost,
            order_type: serviceType,
            status: "Inactivo",
            tracking_code: trackingCode,
          };
        } else if (serviceType === 'documento') {
          requestData = {
            user_id: user.user_id,
            origin_city_id: documentData.cityOfOrigin,
            destination_city_id: documentData.cityOfDestiny,
            origin_address: documentData.addressOfOrigin,
            destination_address: documentData.addressOfDestiny,
            service_date: documentData.date,
            declared_value: cost,
            order_type: serviceType,
            status: "Inactivo",
            tracking_code: trackingCode,
          };
        }
  
        const response = await createOrder(requestData);
  
        if (response && response.data) {
          alert("Pedido solicitado con éxito");
        } else {
          console.error("Error al crear el pedido:", response);
        }
      } catch (error) {
        console.error("Error al crear el pedido:", error);
      }
    } else {
      navigate('/login');
    }
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
            <button type="submit" className="confirm-button mt-1 bg-[#00C853] h-14 p-2 rounded-md"><p className='text-sm text-black font-bold'>Solicitar Servicio</p></button>
        </div>
      </form>
    </div>
  );
};

export default SolicitarServicio;