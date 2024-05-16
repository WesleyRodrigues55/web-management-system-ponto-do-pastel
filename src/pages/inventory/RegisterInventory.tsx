import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import axios from "axios";
import { Toaster, toast } from "sonner";

export function RegisterInventory() {
    
    const url = import.meta.env.VITE_URL_BASE_DEV;
    const token = localStorage.getItem("token");

    const [ingredientId, setIngredientId] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitMeasure, setUnitMeasure] = useState('');
    const [value, setValue] = useState('');
    const [ingredient, setIngredient] = useState([]);


    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`${url}ingredient/get-ingredients`);
                setIngredient(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchIngredients();
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        axios
        .post(
            `${url}stock/insert-stock`, 
            {
                ingrediente_id: ingredientId,
                descricao: description,
                quantidade: quantity,
                unidade_medida: unitMeasure,
                valor: Number(value).toFixed(2).toString(),
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
            setIngredientId('');
            setDescription('');
            setQuantity('');
            setUnitMeasure('');
            setValue('');
            if (response.status != 200) {
                return toast.warning(`Ingrediente [${description}] já existe cadastrado!`)
            }

            return toast.success(`Ingrediente [${description}] cadastrado com sucesso!`)
        })
        .catch((error) => {
            toast.error('Ocorreu um erro ao cadastrar o produto. Tente novamente!', )
        });
    };

    return(
        <>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <Title title={"Register a new product stock"} />

                <form onSubmit={handleSubmit}>

                    <Input 
                        label={"Description of item"} 
                        typeInput={"text"} 
                        value={description}
                        idAndNameInput={"descricao"} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder={"Enter the description of item..."}
                    />

                    <Input 
                        label={"Quantity of item"} 
                        typeInput={"number"} 
                        value={quantity}
                        idAndNameInput={"quantidade"} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder={"Enter the quantity of item..."}
                    />

                    <Input 
                        label={"Unit Measure of item"} 
                        typeInput={"text"} 
                        value={unitMeasure}
                        idAndNameInput={"unidade"} 
                        onChange={(e) => setUnitMeasure(e.target.value)} 
                        placeholder={"Enter the unit measure of item..."}
                    />

                    <Input 
                        label={"Priece of product"} 
                        typeInput={"text"} 
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                        idAndNameInput={"valor"} 
                        placeholder={"Enter the priece of product..."}
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an Ingredient</label>
                        <select  
                            onChange={(e) => setIngredientId(e.target.options[e.target.selectedIndex].value)}
                            className="shadow-sm rounded-md border border-gray-300 focus:ring-redPrincipal-900 focus:border-redPrincipal-900 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-redPrincipal-900 dark:focus:border-redPrincipal-900"
                            required
                        >
                            <option defaultValue={0}>Choose an Ingredient</option>
                            {ingredient.map((item, index) => (
                                <option key={index} value={item['_id']}>{item['nome']}</option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" texto="Register product" colorButton="bg-redPrincipal-900" tamanho="md" onClick={()=>{}} />
                </form>
            </div>
            <Toaster expand={true} richColors/>
        </>

    )
}