import React, { useState, useContext, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react'; // Hamburger Icon
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
  const [showMenu, setShowMenu] = useState(false); // Estado para manejar el menú
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showParametersModal, setShowParametersModal] = useState(false);

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
    console.log(showParametersModal);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
    setShowParametersModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpieza
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
    <header className="bg-[D9D9D9] h-[55px] flex justify-between items-center px-4">
      <div className="logo flex">
        Appa
      </div>

      <button className="sm:hidden" onClick={toggleMenu}>
        <Menu />
      </button>

      <nav className="hidden sm:flex font-regular">
        {user && user.role === 'client' && (
          <>
            <button onClick={() => navigate('/')} className="hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded">Localizar</button>
            <button onClick={() => navigate('/order')} className="hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded">Cotizar</button>
            <button onClick={() => navigate('/my-orders')} className="hover:bg-white w-[150px] h-[35px] pr-2 pl-2 font-medium rounded">Tus pedidos</button>
          </>
        )}
        
        {user && user.role === 'admin' && (
          <>
            <button onClick={() => navigate('/addCarriers')} className="hover:bg-white w-[130px] h-[35px] font-medium rounded">Añadir Bisontes</button>
            <button onClick={() => navigate('/carriers')} className="hover:bg-white w-[130px] h-[35px] font-medium rounded">Bisontes</button>
            <button onClick={handleChangeParameters} className="hover:bg-white w-[130px] h-[35px] font-medium rounded">Parametros</button>
          </>
        )}

        {user && user.role === 'transporter' && (
          <button onClick={() => navigate('/carrierorders')} className="hover:bg-white w-[200px] h-[35px] pr-2 pl-2 font-medium rounded">Pedidos asignados</button>
        )}

        {user ? (
          <div className="user-menu hover:bg-white w-[120px] h-[35px] pr-2 font-medium rounded">
            <button onClick={toggleDropdown}>
              <div className="flex relative bottom-2">
                <FaUser /> 
                <p className="text-base ml-2 bottom-1 relative">{user.username}</p>
              </div>
            </button>
            {showDropdown && (
              <div className="dropdown-menu top-9" ref={dropdownRef}>
                <button className="hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium" onClick={handleEditUser}>Editar usuario</button>
                <button className="hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium" onClick={handleChangePassword}>Cambiar contraseña</button>
                <button className="hover:bg-[#f0f0f0] w-[215px] h-[50px] pr-2 pl-2 mb-2 font-medium" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/order')} className="hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded">Cotizar</button>
            <button onClick={() => navigate('/')} className="hover:bg-white w-[100px] h-[35px] pr-2 pl-2 font-medium rounded">Localizar</button>
            <button onClick={() => navigate('/login')} className="hover:bg-white w-[130px] h-[35px] font-medium rounded">Iniciar sesión</button>
            <button onClick={() => navigate('/register')} className="hover:bg-white w-[130px] h-[35px] pr-2 pl-2 font-medium rounded">Registrarse</button>
          </>
        )}
      </nav>

      {showMenu && (
        <nav className="sm:hidden flex flex-col bg-white absolute rounded-lg w-40 top-[55px] right-0 shadow-lg border p-2 z-10">
          {user && user.role === 'client' && (
            <>
              <button onClick={() => navigate('/')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Localizar</button>
              <button onClick={() => navigate('/order')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Cotizar</button>
              <button onClick={() => navigate('/my-orders')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Tus pedidos</button>
            </>
          )}
          
          {user && user.role === 'admin' && (
            <>
              <button onClick={() => navigate('/addCarriers')} className="hover:bg-gray-200 w-full h-[35px] font-medium rounded">Añadir Bisontes</button>
              <button onClick={() => navigate('/carriers')} className="hover:bg-gray-200 w-full h-[35px] font-medium rounded">Bisontes</button>
              <button onClick={handleChangeParameters} className="hover:bg-gray-200 w-full h-[35px] font-medium rounded">Parametros</button>
            </>
          )}

          {user && user.role === 'transport' && (
            <button onClick={() => navigate('/carrierorders')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Pedidos asignados</button>
          )}
          
          {user ? (
            <>
              <button className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded" onClick={handleEditUser}>Editar usuario</button>
              <button className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded" onClick={handleChangePassword}>Cambiar contraseña</button>
              <button className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded" onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/order')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Cotizar</button>
              <button onClick={() => navigate('/')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Localizar</button>
              <button onClick={() => navigate('/login')} className="hover:bg-gray-200 w-full h-[35px] font-medium rounded">Iniciar sesión</button>
              <button onClick={() => navigate('/register')} className="hover:bg-gray-200 w-full h-[35px] pr-2 pl-2 font-medium rounded">Registrarse</button>
            </>
          )}
        </nav>
      )}
    </header>
      <Modal isOpen={showEditModal} onClose={handleCloseModal}>
        <EditUserForm onSubmit={handleCloseModal}/>
      </Modal>

      <Modal isOpen={showPasswordModal} onClose={handleCloseModal}>
        <ChangePasswordForm onSubmit={handleCloseModal}
        />
      </Modal>

      <Modal isOpen={showParametersModal} onClose={handleCloseModal}>
        <EditParametersForm onSubmit={handleCloseModal}/>
      </Modal>
    </>
  );
}

export default Header;
