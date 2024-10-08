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

  const getAllCities = async () => {
    try {
      const response = await axios.get('http://34.176.155.184:5000/api/cities');
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const quoteOrder = async (origin_city_id, destination_city_id, serviceType, details) => {
    try {
      const response = await axios.post('http://34.176.155.184:5000/api/getOrderCost', {
        origin_city_id,
        destination_city_id,
        serviceType,
        details
      });
      if (response.data) {
        console.log("Respuesta del servidor:", response.data);
        return response.data;  // Asegúrate de devolver los datos de la respuesta
      } else {
        console.log("Respuesta vacía o inválida del servidor");
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la cotización:', error.response ? error.response.data : error.message);
    }
  };

  const createOrder = async (user_id, origin_city_id, destination_city_id, origin_address, destination_address, service_date, declared_value, order_type, tracking_code) => {
    try {
      const response = await axios.post('http://34.176.155.184:5000/api/createOrder', { 
        user_id, 
        origin_city_id, 
        destination_city_id, 
        origin_address, 
        destination_address, 
        service_date, 
        declared_value, 
        order_type, 
        tracking_code 
      });
      console.log('Orden creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al crear la orden:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, deleteUser, parameters, updateGlobalParameters, changePassword, getAllCities, quoteOrder, createOrder }}>
      {children}
    </UserContext.Provider>
  );
};
