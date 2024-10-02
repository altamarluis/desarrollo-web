import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';

const ChangePasswordForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { changePassword } = useContext(UserContext); // Usamos changePassword del contexto
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validatePasswordForm = () => {
    let tempErrors = {};
    if (!passwordData.currentPassword) tempErrors.currentPassword = "La contraseña actual es obligatoria";
    if (!passwordData.newPassword) tempErrors.newPassword = "La nueva contraseña es obligatoria";
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordData.newPassword)) {
      tempErrors.newPassword = "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra, un número y un carácter especial.";
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      tempErrors.confirmNewPassword = "Las contraseñas no coinciden";
    }
    return tempErrors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validatePasswordForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const result = await changePassword(passwordData.newPassword); // Llamamos a changePassword del contexto
        if (result.success) {
          onSubmit(); // Acción a realizar al cambiar la contraseña exitosamente
          setErrors({});
        } else {
          setErrors({ form: result.message });
        }
      } catch (error) {
        console.error("Error en el cambio de contraseña", error);
        setErrors({ form: "Error al cambiar la contraseña" });
      }
    }
  };

  return (
    <form className='edit-form' onSubmit={handlePasswordSubmit}>
      <FormField
        name="currentPassword"
        label="Contraseña actual"
        type="password"
        value={passwordData.currentPassword}
        onChange={handlePasswordInputChange}
        error={errors.currentPassword}
        icon={FaLock}
      />
      <FormField
        name="newPassword"
        label="Nueva contraseña"
        type="password"
        value={passwordData.newPassword}
        placeholder='Ingresa la nueva contraseña'
        onChange={handlePasswordInputChange}
        error={errors.newPassword}
        icon={FaLock}
      />
      <FormField
        name="confirmNewPassword"
        label="Confirmar nueva contraseña"
        type="password"
        value={passwordData.confirmNewPassword}
        placeholder='Confirma la nueva contraseña'
        onChange={handlePasswordInputChange}
        error={errors.confirmNewPassword}
        icon={FaLock}
      />
      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
      <button type="submit" className="submit-btn" style={{ width: 'fit-content', textAlign: 'center' }}>Cambiar Contraseña</button>
    </form>
  );
};

export default ChangePasswordForm;
