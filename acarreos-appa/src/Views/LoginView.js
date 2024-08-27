import React, { useState, useContext } from 'react';
import mapImage2 from '../assets/map-image2.jpg';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterView.css'
import { FaLock, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';
import Database from '../database/Database';


function LoginView() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const [errors, setErrors] = useState({});

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

      const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        } else {
          const user = Database.find(u => u.username.toLowerCase() === formData.username.toLowerCase() && u.password === formData.password);
          if (user) {
            login(user);
            navigate('/');
          } else {
            alert('Credenciales incorrectas');
          }
        }
      };

    return (
      <div className='text-xl'>
        <div className="register-container">
          <div className="form-section">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="register-title">Inicar Sesión</h2>
              <p>¿No tienes una cuenta aún?, <a href="#" className="register-link">Crea una</a></p>
              
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
              
              <div className='forgot-psd'><a href="#" className="register-link">¿Olvidaste tu Contraseña?</a></div>
              
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="register-button">Inicar Sesión</button>
              </div>
            </form>
          </div>
          <div className="map-section" style={{backgroundImage: `url(${mapImage2})`}}></div>
        </div>
      </div>
    );
  }
  
  export default LoginView;