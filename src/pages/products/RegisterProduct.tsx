import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import axios from "axios";
import { Toaster, toast } from "sonner";

export function RegisterProduct() {
    
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState('');


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        axios
        .post(
            `${url}product/insert-product`, 
            {
                nome: name,
                descricao: description,
                preco: Number(value).toFixed(2).toString(),
                categoria: category,
                imagem_produto: productImage,
                ativo: 1
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
            setValue('');
            setProductImage('');
            if (response.status != 200) {
                return toast.warning(`Produto [${name}] já existe cadastrado!`)
            }

            return toast.success(`Produto [${name}] cadastrado com sucesso!`)
        })
        .catch((error) => {
            toast.error('Ocorreu um erro ao cadastrar o produto. Tente novamente!', )
        });
    };

    return(
        <>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <Title title={"Register a new product"} />

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
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
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
                        placeholder={"Enter the link of image product..."}

                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an option</label>
                        <select 
                            onChange={(e) => setCategory(e.target.options[e.target.selectedIndex].value)}
                            id="countries" 
                            className="shadow-sm rounded-md border border-gray-300 focus:ring-redPrincipal-900 focus:border-redPrincipal-900 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-redPrincipal-900 dark:focus:border-redPrincipal-900"
                            required
                        >
                            <option value="salgados">Salgados</option>
                            <option value="doces">Doces</option>
                            <option value="bebidas">Bebidas</option>
                        </select>
                    </div>

                    <Button type="submit" texto="Register product" colorButton="bg-redPrincipal-900" tamanho="md" onClick={()=>{}} />
                </form>
            </div>
            <Toaster expand={true} richColors/>
        </>

    )
}