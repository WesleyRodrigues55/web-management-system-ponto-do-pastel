import axios from "axios";
import { useEffect, useState } from "react"

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Button from "../../components/Button";
import { toast } from "sonner";

export default function OrdersApproved() {
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");

    const [dataOrder, setDataOrder] = useState([])
    const [dataOrderDeliveryStatus, setDataOrderDeliveryStatus] = useState([])

    const handleClickUpdatedStatusOrder = (e: any, itemID: String) => {
        e.preventDefault();
        updateOrderDeliveryStatusForDelivery(itemID);
    }

    const updateOrderDeliveryStatusForDelivery = async (itemId: String) => {
        let newDate = new Date()
        try {
            const response = await axios.put(
                `${url}order-details/update-order-delivery-status-for-delivery`,
                {
                    detalhes_do_pedido_id: itemId,
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'application/json'
                    }
                },
            )
            .then((response) => {
                if (response.status != 200) {
                    return toast.warning(`Erro ao mover pedido n°[${itemId}] para preparo.`)
                }
    
                return toast.success(`Pedido n°[${itemId}] movido para  "Em preparo"!`)
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
                `${url}order-details/get-order-delivery-status`,
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
          }, 1000);
       
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
                                        Pedido N° {index +1}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDateTime(item['data_pedido'])} - Pedido {item['status_pedido']}
                                    </p>
                                </div>

                                <div className="inline-flex items-center text-base gap-4 font-semibold text-gray-900">
                                    <Button 
                                        onClick={(e) => {handleClickUpdatedStatusOrder(e, item['_id'])}}
                                        texto={
                                            <div> 
                                                <DeliveryDiningIcon />
                                                Send for delivery
                                            </div>
                                        }
                                        colorButton="bg-gray-100"
                                        textButton="text-gray-500"
                                        type="button"
                                    />
                                    
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}