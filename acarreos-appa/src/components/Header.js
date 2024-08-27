import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTimes, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaGlobe, FaLock } from 'react-icons/fa';
import '../styles/Header.css';
import { UserContext } from '../services/userContext';
import FormField from './FormField';

function Header() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [errors, setErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });


  const handleClickRegister = () => navigate('/register');
  const handleClickLogin = () => navigate('/login');
  const handleClickOrder = () => navigate('/order');
  const handleClickFind = () => navigate('/');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditUser = () => {
    setEditedUser(user);
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validateEditForm = () => {
    let tempErrors = {};
    if (!editedUser.username.trim()) tempErrors.username = "El nombre de usuario es obligatorio";
    if (!editedUser.email.trim()) tempErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(editedUser.email)) tempErrors.email = "El correo electrónico no es válido";
    if (!editedUser.id.toString().trim()) tempErrors.id = "El ID es obligatorio";
    if (!editedUser.nationality.trim()) tempErrors.nationality = "La nacionalidad es obligatoria";
    return tempErrors;
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateEditForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      updateUser(editedUser);
      setShowEditModal(false);
      setErrors({});
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const formErrors = validatePasswordForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Aquí iría la lógica para cambiar la contraseña
      console.log("Cambio de contraseña:", passwordData);
      setShowPasswordModal(false);
      setErrors({});
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      // Aquí iría la lógica para eliminar la cuenta
      console.log("Cuenta eliminada");
      logout();
      navigate('/');
    }
  };

  return (
    <header>
      <div className="logo">Appa</div>
      <nav>
        <button onClick={handleClickOrder}>Cotizar</button>
        <button onClick={handleClickFind}>Localizar</button>
        {user ? (
          <div className="user-menu">
            <button >Historial</button>
            <button onClick={toggleDropdown}>
              <FaUser /> {user.username}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleEditUser}>Editar usuario</button>
                <button onClick={handleChangePassword}>Cambiar contraseña</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={handleClickLogin}>Iniciar sesión</button>
            <button onClick={handleClickRegister}>Registrarse</button>
          </>
        )}
      </nav>
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h2>Editar Perfil</h2>
            <form className='edit-form' onSubmit={handleEditSubmit}>
              
              <FormField
                name="id"
                label="ID"
                type="text"
                value={editedUser.id}
                onChange={handleInputChange}
                error={errors.id}
                icon={FaIdCard}
              />

              <FormField
                name="username"
                label="Nombre de usuario"
                type="text"
                value={editedUser.username}
                placeholder=""
                onChange={handleInputChange}
                error={errors.username}
                icon={FaUser}
              />
              <FormField
                name="email"
                label="Correo electrónico"
                type="email"
                value={editedUser.email}
                placeholder=""
                onChange={handleInputChange}
                error={errors.email}
                icon={FaEnvelope}
              />

              <FormField
                name="nationality"
                label="Nacionalidad"
                type="text"
                value={editedUser.nationality}
                onChange={handleInputChange}
                error={errors.nationality}
                icon={FaGlobe}
              />
              
              <FormField
                name="location"
                label="Ubicación predeterminada"
                type="text"
                value={editedUser.location}
                placeholder=""
                onChange={handleInputChange}
                error={null}
                icon={FaMapMarkerAlt}
              />
              
              <div className="button-group">
                <button type="submit" className="submit-btn">Guardar Cambios</button>
                <button type="button" className="delete-btn" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
              </div>
            </form>
          </div>
        </div>
      )}
       {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h2>Cambiar Contraseña</h2>
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
              <button type="submit" className="submit-btn">Cambiar Contraseña</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;