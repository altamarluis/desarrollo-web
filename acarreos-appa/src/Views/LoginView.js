import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterView.css';
import { FaLock, FaUser } from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';
import mapImage2 from '../assets/map-image2.jpg';

function LoginView() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = "El nombre de usuario es obligatorio";
    if (!formData.password) tempErrors.password = "La contraseña es obligatoria";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        await login(formData);  // Llama a la función login del contexto
        navigate('/');  // Redirige al usuario después de iniciar sesión
      } catch (error) {
        setApiError('Credenciales incorrectas');  // Muestra un error si las credenciales no son válidas
      }
    }
  };

  return (
    <div className=''>
      <div className="register-container">
        <div className="form-section text-sm">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="register-title font-bold pb-2 text-3xl">Iniciar Sesión</h2>
            <p className='font-medium text-xs pb-4'>
              ¿No tienes una cuenta aún?, <a href="/register" className="register-link hover:underline">Crea una</a>
            </p>

            <FormField
              name="username"
              label="Nombre de usuario"
              type="text"
              value={formData.username}
              placeholder="Ingresa tu nombre de usuario"
              onChange={handleChange}
              error={errors.username}
              icon={FaUser}
            />

            <FormField
              name="password"
              label="Contraseña"
              type="password"
              value={formData.password}
              placeholder="Ingresa una contraseña"
              onChange={handleChange}
              error={errors.password}
              icon={FaLock}
            />

            {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}

            <div className='forgot-psd text-xs font-medium'>
              <a href="#" className="register-link hover:underline">
                <p className='text-xs font-medium underline'>¿Olvidaste tu Contraseña?</p>
              </a>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="register-button">
                <p className='text-sm text-black font-bold'>Iniciar Sesión</p>
              </button>
            </div>
          </form>
        </div>
        <div className="map-section" style={{ backgroundImage: `url(${mapImage2})` }}></div>
      </div>
    </div>
  );
}

export default LoginView;
