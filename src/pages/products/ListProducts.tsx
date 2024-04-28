import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';

export function ListProducts() {
    const url = import.meta.env.VITE_URL_BASE;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(`${url}product/get-products`);
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();
    }, []);

    // console.log(data)
    return (
        <>
        <div>
            <Title title={"List products"} />
            {data.length === 0 ? (
                <div className='text-center'>Carregando...</div>
            ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl">
                    <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Value</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {data.map((item, index) => (
                            <tr key={index} className="border-b border-blue-gray-200 hover:bg-gray-200">
                                <td className="py-3 px-4">{index}</td>
                                <td className="py-3 px-4">{item["nome"]}</td>
                                <td className="py-3 px-4">{item["descricao"]}</td>
                                <td className="py-3 px-4">{item["preco"]}</td>
                                <td className="py-3 px-4">{item["categoria"]}</td>
                                <td className="py-3 px-4 flex gap-3 flex-wrap">
                                    <Link to={`update/${item["_id"]}`} className="font-bold text-blue-600 hover:text-blue-800">
                                        Edit
                                    </Link>
                                    <Link to={`delete/${item["_id"]}`} className="font-bold text-blue-600 hover:text-blue-800">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>

        </>
    );
}