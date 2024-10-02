import React, { useState, useEffect, useContext } from 'react';
import "../styles/Header.css"
import { FaGlobe} from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';

const EditParametersForm = ({ onSubmit }) => {
    const { parameters, updateGlobalParameters } = useContext(UserContext);
    const [params, setParams] = useState({
      max_km_per_bison: '',
      bison_rest_days: '',
      distance_rate: '',
      weight_rate: '',
      declared_value_rate: '',
      medium_dimension_charge: '',
      large_dimension_charge: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
      if (parameters) {
        setParams(parameters);  
      }
    }, [parameters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const validateEditForm = () => {
    let tempErrors = {};
    const fields = ['max_km_per_bison', 'bison_rest_days', 'distance_rate', 'weight_rate', 'declared_value_rate', 'medium_dimension_charge', 'large_dimension_charge'];
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
        name="max_km_per_bison"
        label="Tope máximo de km recorridos por bisonte"
        type="text"
        value={params.max_km_per_bison}
        onChange={handleInputChange}
        error={errors.max_km_per_bison}
        icon={FaGlobe}
      />

      <FormField
        name="bison_rest_days"
        label="Días de descanso bisontes"
        type="text"
        value={params.bison_rest_days}
        onChange={handleInputChange}
        error={errors.bison_rest_days}
        icon={FaGlobe}
      />

      <FormField
        name="distance_rate"
        label="Tarifa por distancia"
        type="text"
        value={params.distance_rate}
        onChange={handleInputChange}
        error={errors.distance_rate}
        icon={FaGlobe}
      />

      <FormField
        name="weight_rate"
        label="Tarifa por peso"
        type="text"
        value={params.weight_rate}
        onChange={handleInputChange}
        error={errors.weight_rate}
        icon={FaGlobe}
      />

      <FormField
        name="declared_value_rate"
        label="Tarifa por valor declarado"
        type="text"
        value={params.declared_value_rate}
        onChange={handleInputChange}
        error={errors.declared_value_rate}
        icon={FaGlobe}
      />

      <FormField
        name="medium_dimension_charge"
        label="Cargo por dimensión media"
        type="text"
        value={params.medium_dimension_charge}
        onChange={handleInputChange}
        error={errors.medium_dimension_charge}
        icon={FaGlobe}
      />

      <FormField
        name="large_dimension_charge"
        label="Cargo por dimensión grande"
        type="text"
        value={params.large_dimension_charge}
        onChange={handleInputChange}
        error={errors.large_dimension_charge}
        icon={FaGlobe}
      />
    
    <button type="submit" className="submit-btn" style={{ width: 'fit-content', textAlign: 'center' }}>Guardar Cambios</button>
  </form>
  );
};

export default EditParametersForm;