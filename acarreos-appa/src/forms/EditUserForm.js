import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaGlobe } from 'react-icons/fa';
import FormField from '../components/FormField';
import { UserContext } from '../services/userContext';

const EditUserForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const { user, logout, updateUser, deleteUser } = useContext(UserContext);
    const [editedUser, setEditedUser] = useState(user || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const validateEditForm = () => {
        let tempErrors = {};
        if (!editedUser.username?.trim()) tempErrors.username = "El nombre de usuario es obligatorio";
        if (!editedUser.email?.trim()) tempErrors.email = "El correo electrónico es obligatorio";
        else if (!/\S+@\S+\.\S+/.test(editedUser.email)) tempErrors.email = "El correo electrónico no es válido";
        if (!editedUser.user_id?.toString().trim()) tempErrors.id = "El ID es obligatorio"; // Cambia id a user_id
        if (!editedUser.nationality?.trim()) tempErrors.nationality = "La nacionalidad es obligatoria";
        return tempErrors;
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateEditForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            try {
                const response = await updateUser({ 
                    user_id: editedUser.user_id, 
                    newUser_id: editedUser.user_id, // Esto puede cambiar según tu lógica
                    username: editedUser.username, 
                    email: editedUser.email, 
                    nationality: editedUser.nationality, 
                    location: editedUser.location 
                });
                console.log(response); // Puedes manejar la respuesta según tus necesidades
                onSubmit();
                setErrors({});
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
            try {
                await deleteUser(user.user_id);
                logout();
                onSubmit();
                navigate('/');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <form className='edit-form' onSubmit={handleEditSubmit}>
            <FormField
                name="id"
                label="ID"
                type="text"
                value={editedUser.user_id || ''} // Cambia id a user_id
                onChange={handleInputChange}
                error={errors.id}
                icon={FaIdCard}
            />
            <FormField
                name="username"
                label="Nombre de usuario"
                type="text"
                value={editedUser.username || ''} // Asegúrate de que tenga un valor por defecto
                onChange={handleInputChange}
                error={errors.username}
                icon={FaUser}
            />
            <FormField
                name="email"
                label="Correo electrónico"
                type="email"
                value={editedUser.email || ''} // Asegúrate de que tenga un valor por defecto
                onChange={handleInputChange}
                error={errors.email}
                icon={FaEnvelope}
            />
            <FormField
                name="nationality"
                label="Nacionalidad"
                type="text"
                value={editedUser.nationality || ''} // Asegúrate de que tenga un valor por defecto
                onChange={handleInputChange}
                error={errors.nationality}
                icon={FaGlobe}
            />
            <FormField
                name="location"
                label="Ubicación predeterminada"
                type="text"
                value={editedUser.location || ''} // Asegúrate de que tenga un valor por defecto
                onChange={handleInputChange}
                error={null}
                icon={FaMapMarkerAlt}
            />
            <div className="button-group">
                <button type="submit" className="submit-btn">Guardar Cambios</button>
                <button type="button" className="delete-btn" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
            </div>
        </form>
    );
};

export default EditUserForm;
