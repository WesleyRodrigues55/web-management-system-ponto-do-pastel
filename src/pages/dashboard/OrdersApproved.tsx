import axios from "axios";
import { useEffect, useState } from "react"

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export default function OrdersApproved() {
    const url = import.meta.env.VITE_URL_BASE;
    const token = localStorage.getItem("token");

    const [dataOrder, setDataOrder] = useState([])
    const [dataOrderDeliveryStatus, setDataOrderDeliveryStatus] = useState([])


    const formatDateTime = (isoDate: any) => {
        const date = new Date(isoDate);
      
        const formattedDate = date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      
        const formattedTime = date.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        //   second: '2-digit',
          hour12: false
        });
      
        return `${formattedDate} - ${formattedTime}h`;
      };

    const fetchOrderDeliveryStatus = async () => {
        try {
            const response = await axios.get(
                `${url}order-delivery-status/get-order-delivery-status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'application/json'
                    }
                }
            );
            setDataOrderDeliveryStatus(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {

        fetchOrderDeliveryStatus()

        setInterval(() => {
            fetchOrderDeliveryStatus()
          }, 5000);
       
    }, [])

    return (
        <>
            <div className="flow-root pr-5">
                <ul role="list" className="divide-y divide-gray-200">
                    {dataOrderDeliveryStatus.map((item, index) => (
                        <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-500">
                                        Pedido N° {index}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDateTime(item['data_pedido'])} - {item['status_pedido']}
                                    </p>
                                </div>

                                <div className="inline-flex items-center text-base gap-4 font-semibold text-gray-900">
                                    <div className=" text-gray-500 flex items-center gap-4 border p-2"> 
                                        <DeliveryDiningIcon />
                                        Send for delivery
                                    </div>
                                    
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}