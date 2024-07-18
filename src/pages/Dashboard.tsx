
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import LatestOrder from './dashboard/LatestOrder';
import OrdersApproved from './dashboard/OrdersApproved';

export function DashBoard() {
    const [clickStore, setClickStore] = useState(false);
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");

    const [status, setStatus] = useState(Number);
    const [id, setID] = useState('');

    const handleClickStore = (e: any) => {
        e.preventDefault();

        axios
            .put(
                `${url}store/update-status/${id}`, 
                {
                    status: status == 1 ? 0 : 1
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'application/json'
                    }
                }
            )
            .then((response) => {
                if (status == 1) {
                    setStatus(0);
                    return toast.warning(`A loja foi fechada!`)
                } else {
                    setStatus(1);
                    return toast.success(`A loja foi aberta!`)
                }
            })
            .catch((error) => {
                toast.error('Ocorreu um erro ao fechar/abrir a loja. Tente novamente!', )
            });
    }


    useEffect(() => {
        const fetchGetStatus = async() => {
            try {
                const response = await axios.get(`${url}store/get-status`);
                setID(response.data.results[0]['_id']);
                setStatus(response.data.results[0]['status']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchGetStatus();
    }, [])


    return (
        <>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                <button
                    onClick={handleClickStore}
                >
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                    {status == 1 ? 'Open store' : 'Store closed'}
                                </span>
                                <h3 className="text-base font-normal text-gray-500">
                                    {status == 1 ? 'Click to close the store' : 'Click to open the store'}
                                </h3>
                            </div>
                            {status == 1 ? 
                                 <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"> 
                                    <LockOpenIcon />
                                </div>
                            : 
                               
                                <div className="ml-5 w-0 flex items-center justify-end flex-1 text-redPrincipal-900 text-base font-bold">   
                                    <LockIcon />
                                </div>
                            } 
                        </div>
                    </div>
                </button>

                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                        <h3 className="text-base font-normal text-gray-500">Visitors this week</h3>
                        </div>
                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        32.9%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                        <h3 className="text-base font-normal text-gray-500">User signups this week</h3>
                        </div>
                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                        -2.7%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900">Latest Orders</h3>
                        <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                        View all
                        </a>
                    </div>
                    <div className='h-[400px] overflow-y-scroll'>
                        <LatestOrder />
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold leading-none text-gray-900">Orders Approved (In preparation)</h3>
                        {/* <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                        View all
                        </a> */}
                    </div>
                    <div className='h-[400px] overflow-y-scroll'>
                        <OrdersApproved />
                    </div>
                </div>
            </div>
            <Toaster expand={true} richColors/>
        </>
    )
}