import React, { createContext, useState, useEffect } from 'react';
import Database, { updateParameters } from '../database/Database'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [parameters, setParameters] = useState(Database.parameters);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setParameters(Database.parameters);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateGlobalParameters = (newParameters) => {
    setParameters(prevParameters => ({ ...prevParameters, ...newParameters }));
    updateParameters(newParameters);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, parameters, updateGlobalParameters  }}>
      {children}
    </UserContext.Provider>
  );
};
