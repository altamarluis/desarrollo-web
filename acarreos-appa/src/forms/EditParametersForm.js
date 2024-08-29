import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaGlobe} from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';

const EditParametersForm = ({ onSubmit }) => {
    const { user, logout, updateUser } = useContext(UserContext);
    const [parameters, setParameters] = useState({});
    const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const validateEditForm = () => {
    let tempErrors = {};
    return tempErrors;
  };


  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateEditForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
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
      value={null}
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />

    <FormField
      name="restDays"
      label="Días de descanso bisontes"
      type="text"
      value={null}
      placeholder=""
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />

    <FormField
      name="distanceFee"
      label="Tarifa por distancia"
      type="text"
      value={null}
      placeholder=""
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />

    <FormField
      name="weightFee"
      label="Tarifa por peso"
      type="text"
      value={null}
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />
    
    <FormField
      name="valueFee"
      label="Tarifa por valor declarado"
      type="text"
      value={null}
      placeholder=""
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />

    <FormField
      name="mediumFee"
      label="cargo dimension media"
      type="text"
      value={null}
      placeholder=""
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />

    <FormField
      name="largeFee"
      label="cargo dimension grande"
      type="text"
      value={null}
      placeholder=""
      onChange={handleInputChange}
      error={null}
      icon={FaGlobe}
    />
    
    <button type="submit" className="submit-btn" style={{ width: 'fit-content', textAlign: 'center' }}>Guardar Cambios</button>
  </form>
  );
};

export default EditParametersForm;