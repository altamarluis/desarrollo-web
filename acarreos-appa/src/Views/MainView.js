import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wp from '../assets/wallpaper.jpg';
import '../styles/MainView.css';

function MainView() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);  // Resetea el error antes de realizar la búsqueda
    try {
      const response = await fetch(`http://34.176.155.184:5000/api/orderStatus?tracking_code=${searchId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }

      const data = await response.json();
      
      if (data.status) {
        setSearchResult(`Pedido encontrado - Estado: ${data.status}`);
      } else {
        setSearchResult('No se encontró ningún pedido con ese ID');
      }
    } catch (err) {
      setError('Hubo un problema con la búsqueda. Por favor, intenta de nuevo.');
    }
  };

  return (
    <main style={{ backgroundImage: `url(${wp})` }}>
      <div className="upper-content">
        <h1 className='font-semibold'>Acarreos Appa</h1>
        <p className='text-xl font-medium'>Conectando todas las naciones</p>
      </div>
      <div className="search-section">
        <div className="search-container">
          <h2 className='text-2xl font-medium'>Localiza tu envío</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Número de guía"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </div>
          {searchResult && (
            <p className="search-result mt-4 text-lg font-medium">{searchResult}</p>
          )}
          {error && (
            <p className="error-message text-red-500 mt-4">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainView;
