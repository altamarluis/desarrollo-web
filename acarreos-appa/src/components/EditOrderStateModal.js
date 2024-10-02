import React, { useState } from 'react';
import Modal from './Modal'; // Importa tu componente Modal

const EditOrderModal = ({ isOpen, onClose, order, onSave, ordersData }) => {
  const [selectedState, setSelectedState] = useState(order.state);

  const handleSave = () => {
    // Encuentra el índice del pedido en ordersData
    const index = ordersData.findIndex(o => o.tracking_code === order.tracking_code);
    
    // Llama a la función de guardado en CarrierTable con el índice
    onSave(index, selectedState); 
    onClose(); // Cierra el modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Editar Estado del Pedido</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Estado del pedido:</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="Entregado">Entregado</option>
          <option value="Retrasado">Retrasado</option>
          <option value="En tránsito">En tránsito</option>
          <option value="Extraviado">Extraviado</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          className="mr-2 bg-gray-300 text-gray-700 py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </Modal>
  );
};

export default EditOrderModal;
