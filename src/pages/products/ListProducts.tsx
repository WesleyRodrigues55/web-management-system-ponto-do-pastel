import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import ReactPaginate from 'react-paginate';

import Title from '../../components/Title';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { Link, NavLink } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';

export function ListProducts() {
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


    const handleSubmitStatusProduct = async (itemId: any, activate: any) => {
        axios
        .put(
            `${url}product/status-product/${itemId}/${activate}`, 
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: 'application/json'
                }
            }
        )
        .then((response) => {
            if (response.status !== 200) {
                return toast.warning(`Produto não foi desativado`)
            }
            setData(prevItems => prevItems.filter(item => item['_id'] !== itemId));
            if (activate == 1) {
                return toast.success(`Produto desativado com sucesso!`);  
            }
            return toast.success(`Produto ativado com sucesso!`);
        })
        .catch((error) => {
            toast.error('Ocorreu um erro ao desativar o produto. Tente novamente!', )
        });
    };

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
                const response = await axios.get(`${url}product/get-products-all`);
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
                <Title title={"List products"} />
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
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left w-[10%]">Price</th>
                            <th className="py-3 px-4 text-left w-[10%]">Category</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {currentPageData.map((item, index) => (                            
                            <tr key={index} className="border-b border-blue-gray-200 hover:bg-gray-200">
                                <td className="py-3 px-4">{item['nome']}</td>
                                <td className="py-3 px-4">{item['descricao']}</td>
                                <td className="py-3 px-4">{item['preco']}</td>
                                <td className="py-3 px-4">{item['categoria']}</td>
                                <td className="py-5 px-4 flex gap-3">
                                    <Button 
                                        texto={<NavLink to={`update/${item['_id']}`}><BorderColorIcon /></NavLink>} 
                                        type='submit'
                                        colorButton='bg-blue-600'
                                        onClick={() => {}} 
                                    />
                                    {item['ativo'] == 1 ? 
                                        <Button 
                                            texto={<VisibilityOffIcon />} 
                                            colorButton='bg-redPrincipal-900'
                                            onClick={() => {
                                                handleSubmitStatusProduct(item["_id"], item['ativo']);
                                            }} 
                                        /> :    
                                            <Button 
                                                texto={<VisibilityIcon />} 
                                                colorButton='bg-black'
                                                onClick={() => {
                                                    handleSubmitStatusProduct(item["_id"], item['ativo']);
                                                }} 
                                            />
                                    } 
                                    
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
