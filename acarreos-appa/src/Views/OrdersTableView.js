import { useState } from "react"
import HeaderList from "../components/common/HeaderList"
import FilterList from "../components/common/FilterList"
import OrderTable from "../components/OrderTable"

const OrdersListComponent = () => {

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
        <div className="w-1/2">
          <div className="flex justify-center py-4 text-3xl font-bold">
            <h1>Mis pedidos</h1>
          </div>
            
            <div className="w-1/2 justify-items-center">
                <div className="grid z-50 gap-4 place-items-center w-full mb-3 mt-5">
                <FilterList setData={setData} dataTotal={dataTotal} />
                </div>
                <div className="w-1/2 pr-20 pl-20 justify-center">
                <OrderTable data={data} />
                </div>
            </div>
        </div>
        
    )
}

export default OrdersListComponent;