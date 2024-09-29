import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaGlobe} from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';

const EditParametersForm = ({ onSubmit }) => {
    const { parameters, updateGlobalParameters } = useContext(UserContext);
    const [params, setParams] = useState(parameters);
    const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const validateEditForm = () => {
    let tempErrors = {};
    const fields = ['maxKm', 'restDays', 'distanceFee', 'weightFee', 'valueFee', 'mediumFee', 'largeFee'];
    
    fields.forEach(field => {
      if (!params[field]) {
        tempErrors[field] = 'Este campo es obligatorio';
      } else if (isNaN(Number(params[field]))) {
        tempErrors[field] = 'Este campo debe ser numérico';
      }
    });
    return tempErrors;
  };


  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateEditForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      updateGlobalParameters(params)
      onSubmit();
      setErrors({});
    }
  };

  return (
    <form className='edit-form' onSubmit={handleEditSubmit}>
              
              <FormField
      name="maxKm"
      label="Tope máximo de km recorridos por bisonte"
      type="text"
      value={params.maxKm}
      onChange={handleInputChange}
      error={errors.maxKm}
      icon={FaGlobe}
    />

    <FormField
      name="restDays"
      label="Días de descanso bisontes"
      type="text"
      value={params.restDays}
      placeholder=""
      onChange={handleInputChange}
      error={errors.restDays}
      icon={FaGlobe}
    />

    <FormField
      name="distanceFee"
      label="Tarifa por distancia"
      type="text"
      value={params.distanceFee}
      placeholder=""
      onChange={handleInputChange}
      error={errors.distanceFee}
      icon={FaGlobe}
    />

    <FormField
      name="weightFee"
      label="Tarifa por peso"
      type="text"
      value={params.weightFee}
      onChange={handleInputChange}
      error={errors.weightFee}
      icon={FaGlobe}
    />
    
    <FormField
      name="valueFee"
      label="Tarifa por valor declarado"
      type="text"
      value={params.valueFee}
      placeholder=""
      onChange={handleInputChange}
      error={errors.valueFee}
      icon={FaGlobe}
    />

    <FormField
      name="mediumFee"
      label="cargo dimension media"
      type="text"
      value={params.mediumFee}
      placeholder=""
      onChange={handleInputChange}
      error={errors.mediumFee}
      icon={FaGlobe}
    />

    <FormField
      name="largeFee"
      label="cargo dimension grande"
      type="text"
      value={params.largeFee}
      placeholder=""
      onChange={handleInputChange}
      error={errors.largeFee}
      icon={FaGlobe}
    />
    
    <button type="submit" className="submit-btn" style={{ width: 'fit-content', textAlign: 'center' }}>Guardar Cambios</button>
  </form>
  );
};

export default EditParametersForm;