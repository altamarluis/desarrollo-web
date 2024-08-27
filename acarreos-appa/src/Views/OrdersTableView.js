import { useState } from "react"
import OrderTable from "../components/Table"

const OrdersList = () => {

  const columns = [
    {	
      name: 'GUÍA PEDIDO',
      cell: row => (
        <div className='font-semibold'> {row.orderId} </div>
      ),
      
    },
    {
      name: 'DESCRIPCIÓN',
      cell: row => row.description,
    },
  
    {
      name: 'ESTADO',
      selector: row => {
        const stateStyles = {
          delivered: "bg-[#E1FCEF] text-[#14804A]",       // Despachado
          delayed: "bg-[#FFF500] text-[#5C3131]",      // Retrasado
          transit: "bg-[#F0F1FA] text-[#4F5AED]",      // En tránsito
          lost: "bg-[#FAF0F3] text-[#D12953]",         // Perdido
          inactive: "bg-[#E9EDF5] text-[#5A6376]"      // Inactivo
        };
    
        const stateLabels = {
          delivered: "Entregado",
          delayed: "Retrasado",
          transit: "En tránsito",
          lost: "Perdido",
          inactive: "Inactivo"
        };
    
        return (
          <div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.state] || 'bg-gray-200 text-gray-700'}`}>
            {stateLabels[row.state] || 'Desconocido'}
          </div>
        );
      }
    },
    {
      name: 'ÚLTIMA ACTUALIZACIÓN',
      cell: row => new Date(row.updateAt).toLocaleDateString('es-ES'),
    },
    {
      name: 'COSTO',
      cell: row => (
        <div className='font-semibold'> ${row.price} </div>
      ),
    }
  ]
  
  const dataTotal = [
      {
          orderId: 102932138,
          description: 'dasdasdasd',
          state: 'inactive',
          updateAt: new Date('2024-03-26'),
          price: 100.00
      },
      {
          orderId: 102342343,
          description: 'dasdasdasd',
          state: 'transit',
          updateAt: new Date('2024-03-22'),
          price: 100.00
      },
      {
          orderId: 102932138,
          description: 'dasdasdasd',
          state: 'delivered',
          updateAt: new Date('2024-03-21'),
          price: 200.00
      },
      {
          orderId: 102932138,
          description: 'dasdasdasd',
          state: 'delayed',
          updateAt: new Date('2024-03-26'),
          price: 300.00
      },
      {
          orderId: 103230934,
          description: 'ddasfsdfsd',
          state: 'lost',
          updateAt: new Date('2024-03-26'),
          price: 300.00
      },
      
        
    ]


  const [data, setData] = useState(dataTotal)

    return (
        <div className="py-4 text-3xl font-bold">
          <div className="justify-items-start p-10 pb-10 font-bold">
            <h2>Tus pedidos</h2>
          </div>
            
            <div className="grid justify-items-center">
                <div className="w-full pr-20 pl-20 justify-center">
                <OrderTable data={data} columns={columns} />
                </div>
            </div>
        </div>
        
    )
}

export default OrdersList;