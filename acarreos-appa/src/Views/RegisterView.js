import React, { useState } from 'react';
import mapImage from '../assets/map-image.jpg';
import mapImage2 from '../assets/map-image2.jpg';
import '../styles/RegisterView.css'
import { FaLock, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import FormField from '../components/FormField';


function RegisterView() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: ''
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
        if (!formData.email.trim()) tempErrors.email = "El correo electrónico es obligatorio";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido";
        if (!formData.password) tempErrors.password = "La contraseña es obligatoria";
        if (!formData.confirmPassword) tempErrors.confirmPassword = "Debes confirmar la contraseña";
        else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Las contraseñas no coinciden";
        return tempErrors;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        } else {
          setErrors({});
          console.log("Formulario enviado:", formData);
          // Aquí iría la lógica para enviar los datos al servidor
        }
      };

    return (
      <div>
        <div className="register-container">
          <div className="form-section">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="register-title">Crear una cuenta</h2>
              <p>¿Ya tienes una cuenta? <a href="#" className="register-link">Inicia Sesión</a></p>
              
              <FormField
                name="username"
                label="Nombre de usuario*"
                type="text"
                value={formData.username}
                placeholder="Ingresa tu nombre de usuario"
                onChange={handleChange}
                error={errors.username}
                icon={FaUser}
              />

              <FormField
                name="email"
                label="Correo electrónico*"
                type="email"
                value={formData.email}
                placeholder="Ingresa tu correo electrónico"
                onChange={handleChange}
                error={errors.email}
                icon={FaEnvelope}
              />
              
              <FormField
                name="password"
                label="Contraseña*"
                type="password"
                value={formData.password}
                placeholder="Ingresa una contraseña"
                onChange={handleChange}
                error={errors.password}
                icon={FaLock}
              />
              
              <FormField
                name="confirmPassword"
                label="Confirma tu contraseña*"
                type="password"
                value={formData.confirmPassword}
                placeholder="Ingresa tu contraseña nuevamente"
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={FaLock}
              />

              <FormField
                name="location"
                label="Ubicación predeterminada (opcional)"
                type="text"
                value={formData.location}
                placeholder="Ubicación predeterminada"
                onChange={handleChange}
                error={null}
                icon={FaMapMarkerAlt}
              />
              
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="register-button">Registrarme</button>
              </div>
            </form>
          </div>
          <div className="map-section" style={{backgroundImage: `url(${mapImage2})`}}></div>
        </div>
      </div>
    );
  }
  
  export default RegisterView;