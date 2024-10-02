import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [parameters, setParameters] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://34.176.155.184:5000/api/login', credentials);
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const updateUser = async (updatedUserData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.user_id;  // Obtiene el user_id del usuario almacenado
      if (!userId) {
        throw new Error("El user_id no está presente");
      }
  
      const response = await axios.patch('http://34.176.155.184:5000/api/updateUser', {
        user_id: userId,  // ID del usuario que se va a actualizar
        newUser_id: updatedUserData.id, // El nuevo ID (si se actualiza)
        username: updatedUserData.username,
        email: updatedUserData.email,
        nationality: updatedUserData.nationality,
        location: updatedUserData.location,
      });
  
      const updatedUser = response.data;
  
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://34.176.155.184:5000/api/deleteUser/${userId}`);
      console.log('Usuario eliminado:', response.data);
      logout();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateGlobalParameters = async (newParameters) => {
    try {
      const response = await axios.patch('http://34.176.155.184:5000/parameters', newParameters);
      const updatedParameters = response.data;
      setParameters(prevParameters => ({ ...prevParameters, ...updatedParameters }));
    } catch (error) {
      console.error('Error updating parameters:', error);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.user_id;  // Verificar que el user_id esté presente
      if (!userId) {
        throw new Error("El user_id no está presente");
      }

      const response = await axios.patch('http://34.176.155.184:5000/api/changePassword', {
        user_id: userId,
        password: newPassword
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: 'Error changing password' };
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, deleteUser, parameters, updateGlobalParameters, changePassword }}>
      {children}
    </UserContext.Provider>
  );
};
