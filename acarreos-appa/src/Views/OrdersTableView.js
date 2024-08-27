import { useState } from "react"
import OrderTable from "../components/Table"

const OrdersList = () => {

  const dataTotal = [
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'inactive',
        updateAt: new Date('2024-03-26'),
        price: 100
    },
    {
        orderId: 1023423,
        description: 'dasdasdasd',
        state: 'transit',
        updateAt: new Date('2024-03-22'),
        price: 100
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'active',
        updateAt: new Date('2024-03-21'),
        price: 200
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'transit',
        updateAt: new Date('2024-03-26'),
        price: 300
    },
    
      
  ]

  const [data, setData] = useState(dataTotal)

    return (
        <div className="justify-center py-4 text-3xl font-bold">
          <div className="p-10 pb-10 font-bold">
            <h2>Mis pedidos</h2>
          </div>
            
            <div className="grid justify-items-center">
                <div className="w-full pr-20 pl-20 justify-center">
                <OrderTable data={data} />
                </div>
            </div>
        </div>
        
    )
}

export default OrdersList;