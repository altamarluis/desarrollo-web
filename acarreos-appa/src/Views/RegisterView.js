import React, { useState, useContext } from 'react';
import mapImage from '../assets/map-image.jpg';
import mapImage2 from '../assets/map-image2.jpg';
import '../styles/RegisterView.css'
import { FaLock, FaMapMarkerAlt, FaEnvelope, FaUser, FaIdCard, FaGlobe } from 'react-icons/fa';
import FormField from '../components/FormField';
import Database from '../database/Database';
import { UserContext } from '../services/userContext';
import { useNavigate } from 'react-router-dom';

function RegisterView() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        id: '',
        nationality: '',
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
        if (!formData.id.trim()) tempErrors.id = "El ID es obligatorio";
        else if (!/^\d+$/.test(formData.id)) tempErrors.id = "El ID debe ser numérico";
        if (!formData.nationality.trim()) tempErrors.nationality = "La nacionalidad es obligatoria";
        if (!formData.email.trim()) tempErrors.email = "El correo electrónico es obligatorio";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido";
        if (!formData.password) tempErrors.password = "La contraseña es obligatoria";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)) tempErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra, un número y un carácter especial.";
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
          const newUser = {
            role: 'client',  // Rol por defecto
            id: parseInt(formData.id),
            username: formData.username,
            email: formData.email,
            nationality: formData.nationality,
            password: formData.password,
            location: formData.location || 'No especificada'
        };

        Database.users.push(newUser);
        alert('Usuario registrado con éxito');
        login(newUser);
        navigate('/');
        
      }
      };

    return (
      <div>
        <div className="register-container flex-col">
          <div className="form-section text-sm">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="register-title font-bold pb-2 text-3xl">Crear una cuenta</h2>
              <p className='font-medium text-xs pb-4'>¿Ya tienes una cuenta?, <a href="/login" className="register-link  hover:underline">Inicia Sesión</a></p>
              
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
                name="id"
                label="Número de Indentidad*"
                type="text"
                value={formData.id}
                placeholder="Ingresa tu ID"
                onChange={handleChange}
                error={errors.id}
                icon={FaIdCard}
              />

              <FormField
                name="nationality"
                label="Nacionalidad*"
                type="text"
                value={formData.nationality}
                placeholder="Ingresa tu nacionalidad"
                onChange={handleChange}
                error={errors.nationality}
                icon={FaGlobe}
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
                <button type="submit" className="register-button mt-1 bg-[#00C853] h-10 p-2 rounded-md mb-10"><p className='text-sm text-black font-bold'>Registrarme</p></button>
              </div>
            </form>
          </div>
          <div className="map-section" style={{backgroundImage: `url(${mapImage2})`}}></div>
        </div>
      </div>
    );
  }
  
  export default RegisterView;