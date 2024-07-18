import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useParams } from "react-router-dom";

export function EditProduct() {
    
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState('');
    const [data, setData] = useState([])


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        axios
        .put(
            `${url}product/update-product/${id}`, 
            {
                nome: name,
                descricao: description,
                preco: price,
                categoria: category,
                imagem_produto: productImage,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: 'application/json'
                }
            }
        )
        .then((response) => {
            setName('');
            setDescription('');
            setPrice('');
            setProductImage('');
            setCategory('');
            if (response.status != 200) {
                return toast.warning(`Produtonão existe cadastrado!`)
            }

            toast.success(`Produto [${name}] edditado com sucesso!`)
            setInterval(() => {
                // redirecionar usando o router
                return window.location.href = '../'
            }, 1000)
           
        })
        .catch((error) => {
            toast.error('Ocorreu um erro ao cadastrar o produto. Tente novamente!', error)
        });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${url}product/product-by-id/${id}`);

            if (response.status != 200) {
                return toast.error('Ocorreu um erro ao listar o produto. Tente novamente!')
            }
            let product = response.data.results[0]
            setData(product)
            setName(product.nome ?? '')
            setDescription(product.descricao ?? '')
            setPrice(product.preco ?? '')
            setProductImage(product.imagem_produto ?? '')
            setCategory(product.categoria ?? '')
        }   

        fetchProduct();
    }, [])

    return(
        <>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <Title title={"Edit product"} />

                <form onSubmit={handleSubmit}>
                    <Input 
                        label={"Name of product"} 
                        typeInput={"text"} 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        idAndNameInput={"nome"} 
                        placeholder={"Enter the name of product..."}
                    />

                    <Input 
                        label={"Priece of product"} 
                        typeInput={"text"} 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} 
                        idAndNameInput={"valor"} 
                        placeholder={"Enter the priece of product..."}
                    />

                    <Input 
                        label={"Description of product"} 
                        typeInput={"textarea"} 
                        value={description}
                        idAndNameInput={"descricao"} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder={"Enter the description of product..."}
                    />

                    <Input 
                        label={"Image of product"} 
                        typeInput={"text"} 
                        value={productImage}
                        idAndNameInput={"img"}
                        onChange={(e) => setProductImage(e.target.value)} 
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an option</label>
                        <select 
                            onChange={(e) => setCategory(e.target.options[e.target.selectedIndex].value)}
                            id="countries" 
                            className="shadow-sm rounded-md border border-gray-300 focus:ring-redPrincipal-900 focus:border-redPrincipal-900 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-redPrincipal-900 dark:focus:border-redPrincipal-900"
                            required
                        >   
                            <option value={category}>{category.toUpperCase()}</option>
                            <option value="salgados">SALGADOS</option>
                            <option value="doces">DOCES</option>
                            <option value="bebidas">BEBIDAS</option>
                        </select>
                    </div>

                    <Button type="submit" texto="Edit product" colorButton="bg-black" tamanho="md" onClick={()=>{}} />
                </form>
            </div>
            <Toaster expand={true} richColors/>
        </>

    )
}