import axios from "axios";
import { useEffect, useState } from "react"

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { toast } from "sonner";

export default function LatestOrder() {
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");

    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidoId, setPedidoId] = useState('')

    const handleOpenModal = (carrinho_id: any) => {
        setPedidoId(carrinho_id)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClickApproved = (e: any, itemID: String) => {
        e.preventDefault();
        updateOrderDeliveryStatus(itemID);
    }

    const updateOrderDeliveryStatus = async (itemId: String) => {
        let newDate = new Date()
        try {
            const response = await axios.put(
                `${url}order-details/update-order-delivery-status`,
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
    
    const fetchOrder = async () => {
        try {
            const response = await axios.get(
                `${url}order-details/get-approved-orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'application/json'
                    }
                }
            );
            setData(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {        
        fetchOrder()

        setInterval(() => {
            fetchOrder()
          }, 1000);
    }, [])

    return (
        <>
            <div className="flow-root pr-5">
                <ul role="list" className="divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <RestaurantIcon />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-500">
                                        Pedido N° {index + 1}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDateTime(item['data_pedido'])} - Pedido aguardando aprovação
                                    </p>
                                </div>

                                <div className="inline-flex items-center text-base gap-4 font-semibold text-gray-900">
                                    <span>
                                        R${item['valor_total']}
                                    </span>


                                    {/* abrir modal e exibir os detalhes do pedido (já tem o di carrinho) */}
                                    <Button 
                                        onClick={() => handleOpenModal(item['carrinho_id'])}
                                        texto={<div className=" text-gray-500"><RemoveRedEyeIcon /></div>}
                                        colorButton="bg-gray-100"
                                        type="button"
                                    />

                                    {/* recusar pedido (pedido é negado, status muda pra recusado e cliente recebe que pedido foi recusado) */}
                                    <Button 
                                        onClick={() => {}}
                                        texto={<div className=" text-red-500"><ThumbDownIcon /></div>}
                                        colorButton="bg-gray-100"
                                        type="button"
                                    />

                                    {/* aprovar pedido (pedido é movido para "pedidos em preparo") - card ao lado */}
                                    {/* quando clicado, insere na coleção "status_entrega_pedido" carrinho_id, detalhes_do_pedido_id, e status "em preparo" */}
                                    <Button 
                                        onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleClickApproved(e, item['_id']);
                                        }}
                                        texto={<div className=" text-green-500"><ThumbUpAltIcon /></div>}
                                        colorButton="bg-gray-100"
                                        type="button"
                                    />

                                    
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} itemId={pedidoId} />
        </>
    )
}