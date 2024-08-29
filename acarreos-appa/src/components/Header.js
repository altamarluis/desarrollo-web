import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import '../styles/Header.css';
import { UserContext } from '../services/userContext';
import Modal from './Modal';
import EditUserForm from '../forms/EditUserForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import EditParametersForm from '../forms/EditParametersForm';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showParametersModal, setShowParametersModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditUser = () => {
    setShowEditModal(!showEditModal);
    setShowDropdown(false);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(!showPasswordModal);
    setShowDropdown(false);
  };

  const handleChangeParameters = () => {
    setShowParametersModal(!showParametersModal);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
    setShowParametersModal(false)
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
      console.log("Cambio de contraseña:", passwordData);
      setShowPasswordModal(false);
      setErrors({});
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Cierra el menú si se hace clic fuera
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpieza
    };
  }, []);

  return (
    <header className='bg-[D9D9D9] h-[55px]'>
      <div className="logo">Appa</div>
      <nav className='font-regular'>
        {user && user.role === 'client' && (
          <>
            <button onClick={() => navigate('/')} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Localizar</button>
            <button onClick={() => navigate('/order')} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Cotizar</button>
            <button onClick={() => navigate('/my-orders')} className='hover:bg-white w-[150px] h-[35px] pr-2 pl-2 font-medium rounded'>Tus pedidos</button>
          </>
        )}
        
        {user && user.role === 'admin' && (
          <>
            <button onClick={() => navigate('/addCarriers')} className='hover:bg-white w-[130px] h-[35px] font-medium rounded'>Añadir Bisontes</button>
            <button onClick={() => navigate('/carriers')} className='hover:bg-white w-[130px] h-[35px] font-medium rounded'>Bisontes</button>
            <button onClick={handleChangeParameters} className='hover:bg-white w-[130px] h-[35px] font-medium rounded'>Parametros</button>
          </>
        )}

        {user && user.role === 'transport' && (
          <>
            <button onClick={() => navigate('/carrierorders')} className='hover:bg-white w-[200px] h-[35px] pr-2 pl-2 font-medium rounded'>Pedidos asignados</button>
          </>
        )}
        
        {user ? (
          <div className="user-menu hover:bg-white w-[120px] h-[35px] pr-2 font-medium rounded">
            <button onClick={toggleDropdown}>
              <div className='flex relative bottom-2'> <FaUser /> <p className='text-base ml-2 bottom-1 relative'>{user.username}</p></div>
              
            </button>
            {showDropdown && (
              <div className="dropdown-menu top-9" ref={dropdownRef}>
                <button className='hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium' onClick={handleEditUser}>Editar usuario</button>
                <button className='hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium' onClick={handleChangePassword}>Cambiar contraseña</button>
                <button className='hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium' onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/order')} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Cotizar</button>
            <button onClick={() => navigate('/')} className='hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded'>Localizar</button>
            <button onClick={() => navigate('/login')} className='hover:bg-white w-[130px] h-[35px] font-medium rounded'>Iniciar sesión</button>
            <button onClick={() => navigate('/register')} className='hover:bg-white w-[130px] h-[35px] pr-2 pl-2 font-medium rounded'>Registrarse</button>
          </>
        )}
      </nav>

      <Modal isOpen={showEditModal} onClose={handleCloseModal}>
        <h2>Editar Usuario</h2>
        <EditUserForm onSubmit={handleCloseModal} />
      </Modal>

      <Modal isOpen={showPasswordModal} onClose={handleCloseModal}>
        <h2>Cambiar Contraseña</h2>
        <ChangePasswordForm
          passwordData={passwordData}
          onInputChange={handlePasswordInputChange}
          errors={errors}
          onSubmit={handlePasswordSubmit}
        />
      </Modal>

      <Modal isOpen={showParametersModal} onClose={handleCloseModal}>
        <h2>Editar Parametros</h2>
        <EditParametersForm onSubmit={handleCloseModal}/>
      </Modal>
    </header>
  );
}

export default Header;
