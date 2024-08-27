import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTimes, FaLock } from 'react-icons/fa';
import '../styles/Header.css';
import { UserContext } from '../services/userContext';
import FormField from './FormField';
import Modal from './Modal'
import EditUserForm from '../forms/EditUserForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';

function Header() {
  const navigate = useNavigate();
  const { user, logout} = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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
    setShowEditModal(!showEditModal);
    setShowDropdown(false)
  };

  const handleChangePassword = () => {
    setShowPasswordModal(!showPasswordModal);
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
    setErrors({});
  };

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

  return (
    <header className='bg-[D9D9D9] h-[55px]'>
      <div className="logo">Appa</div>
      <nav className='font-regular '>
        <button onClick={handleClickOrder} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Cotizar</button>
        <button onClick={handleClickFind} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Localizar</button>
        {user && (
          <button>Historial</button>
        )}
        {user ? (
          <div className="user-menu">
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
            <button onClick={handleClickLogin} className='hover:bg-white w-[130px] h-[35px] font-medium rounded'>Iniciar sesión</button>
            <button onClick={handleClickRegister} className='hover:bg-white w-[130px] h-[35px] pr-2 pl-2 font-medium rounded'>Registrarse</button>
          </>
        )}
      </nav>
            <Modal isOpen={showEditModal} onClose={handleCloseModal}>
              <h2>Editar Usuario</h2>
              <EditUserForm onSubmit={handleEditUser} />
            </Modal>

            <Modal isOpen={showPasswordModal} onClose={handleCloseModal}>
              <h2>Cambiar Contraseña</h2>
              <ChangePasswordForm onSubmit={handleChangePassword} />
            </Modal>
    </header>
  );
}

export default Header;