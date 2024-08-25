import React, { useState } from 'react';
import mapImage from '../assets/map-image.jpg';
import mapImage2 from '../assets/map-image2.jpg';
import '../styles/RegisterView.css'
import { FaLock, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';


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
              
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario*</label>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        id="username"
                        name="username"
                        className={`register-input ${errors.username ? 'input-error' : ''}`}
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div> 
              
              <div className="form-group">
                <label htmlFor="email">Correo electrónico*</label>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        id="email"
                        name="email"
                        className={`register-input ${errors.email ? 'input-error' : ''}`}
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Contraseña*</label>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                    id="password"
                    name="password"
                    className={`register-input ${errors.password ? 'input-error' : ''}`}
                    type="password"
                    placeholder="Ingresa una contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirma tu contraseña*</label>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`register-input ${errors.confirmPassword ? 'input-error' : ''}`}
                    type="password"
                    placeholder="Ingresa tu contraseña nuevamente"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    />
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Ubicación predeterminada (opcional)</label>
                <div className="input-group">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                    id="location"
                    name="location"
                    className="register-input"
                    type="text"
                    placeholder="Ubicación predeterminada"
                    value={formData.location}
                    onChange={handleChange}
                    />
                </div>
              </div>
              
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