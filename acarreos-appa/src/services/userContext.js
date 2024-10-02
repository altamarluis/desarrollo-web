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

    fetchParameters();
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
      const response = await axios.put(`http://34.176.155.184:5000/users/${updatedUserData.id}`, updatedUserData);
      const updatedUser = response.data;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://34.176.155.184:5000/users/${userId}`);
      logout();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const changePassword = async (newPassword) => {
    if (!user) {
      throw new Error("El usuario no está autenticado");
    }

    try {
      const response = await axios.patch('http://34.176.155.184:5000/api/changePassword', {
        user_id: user.id,
        password: newPassword
      });

      if (response.status === 200) {
        const updatedUser = response.data;
        console.log(response.data);
        return { success: true, user: updatedUser };
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return { success: false, message: error.response?.data?.message || "Error en la solicitud" };
    }
  };

  const fetchParameters = async () => {
    try {
      const response = await axios.get('http://34.176.155.184:5000/api/parameters');
      setParameters(response.data);
    } catch (error) {
      console.error('Error fetching parameters:', error);
    }
  };

  const updateGlobalParameters = async (newParameters) => {
    try {
      // Llamar al backend enviando los parámetros en el formato correcto
      const response = await axios.patch('http://34.176.155.184:5000/api/updateParams', {
        max_km_per_bison: newParameters.max_km_per_bison,
        bison_rest_days: newParameters.bison_rest_days,
        distance_rate: newParameters.distance_rate,
        weight_rate: newParameters.weight_rate,
        declared_value_rate: newParameters.declared_value_rate,
        medium_dimension_charge: newParameters.medium_dimension_charge,
        large_dimension_charge: newParameters.large_dimension_charge
      });
  
      const updatedParameters = response.data;
      setParameters(prevParameters => ({ ...prevParameters, ...updatedParameters }));
  
      return updatedParameters; 
    } catch (error) {
      console.error('Error updating parameters:', error);
      throw new Error('No se pudieron actualizar los parámetros'); 
    }
  };
  

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, changePassword, deleteUser, parameters, fetchParameters, updateGlobalParameters }}>
      {children}
    </UserContext.Provider>
  );
};
