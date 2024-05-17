import axios from 'axios';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';

import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function ListInventory() {
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const filteredData = data.filter(item => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return (
            searchRegex.test(item['nome']) || 
            searchRegex.test(item['descricao']) || 
            searchRegex.test(item['preco']) || 
            searchRegex.test(item['categoria'])
        );
    });

    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handlePageClick = (selectedPage: any) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // Reset currentPage to 0 when search term changes
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${url}stock/get-stock`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            ContentType: 'application/json'
                        }
                    }
                );
                setData(response.data.results);
                setTotalCount(response.data.results.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);


    return (
        <>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <Title title={"List Inventory"} />
                <Input 
                    typeInput={"text"} 
                    onChange={handleSearch} 
                    value={searchTerm}
                    idAndNameInput={"search"} 
                    placeholder={"Search by (name, description, price or category)"}
                />
                <div className='my-5'>
                    <ReactPaginate
                        pageCount={Math.ceil(totalCount / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
               </div>
                <table className="min-w-full bg-white rounded-xl">
                    <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left w-25">Description</th>
                            <th className="py-3 px-4 text-left w-25">Quantity</th>
                            {/* <th className="py-3 px-4 text-left">Price</th> */}
                            <th className="py-3 px-4 text-left w-25">Unit of Measure</th>
                            <th className="py-3 px-4 text-left w-25">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {currentPageData.map((item, index) => (                            
                            <tr key={index} className="border-b border-blue-gray-200 hover:bg-gray-200">
                                <td className="py-3 px-4">{item['descricao']}</td>
                                <td className="py-3 px-4">{item['quantidade']}{item['unidade_medida'] == 'grama' ? 'g' : 'kg'}</td>
                                {/* <td className="py-3 px-4">{item['valor']}</td> */}
                                <td className="py-3 px-4" >{item['unidade_medida']}</td>
                                <td className="py-5 px-4 flex gap-3 w-[80px]">
                                    <Button 
                                        texto={<NavLink to={`update/${item['_id']}`}><BorderColorIcon /></NavLink>} 
                                        type='submit'
                                        colorButton='bg-blue-600'
                                        onClick={() => {}} 
                                    />                                    
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>

               

            </div>
             <Toaster expand={true} richColors/>

            
        </>
    );
}
