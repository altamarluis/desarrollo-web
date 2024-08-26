import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTimes, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Header.css';
import { UserContext } from '../services/userContext';
import FormField from './FormField';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    location: ''
  });;

  const handleClickRegister = () => navigate('/register');
  const handleClickLogin = () => navigate('/login');
  const handleClickOrder = () => navigate('/order');
  const handleClickFind = () => navigate('/');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditUser = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el usuario en el backend
    setShowModal(false);
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
              <FaUser /> {user}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleEditUser}>Editar usuario</button>
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
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <h2>Editar Perfil</h2>
            <form className='edit-form' onSubmit={handleSubmit}>
              
              <FormField
                name="name"
                label="Nombre de usuario"
                type="text"
                value={editedUser.name}
                placeholder=""
                onChange={handleInputChange}
                error={null}
                icon={FaUser}
              />
              <FormField
                name="email"
                label="Correo electrónico"
                type="email"
                value={editedUser.email}
                placeholder=""
                onChange={handleInputChange}
                error={null}
                icon={FaEnvelope}
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
              
              <button type="submit" className="submit-btn">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;