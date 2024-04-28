import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";

export function RegisterProduct() {

 

    return(
        <>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <Title title={"Register a new product"} />

                <form action="#">
                    <Input label={"Name of product"} typeInput={"text"} idAndNameInput={"nome"} placeholder={"Enter the name of product..."}/>

                    <Input label={"Priece of product"} typeInput={"text"} idAndNameInput={"valor"} placeholder={"Enter the priece of product..."}/>

                    <Input label={"Description of product"} typeInput={"textarea"} idAndNameInput={"descricao"} placeholder={"Enter the description of product..."}/>

                    <Input label={"Image of product"} typeInput={"file"} idAndNameInput={"img"}/>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an option</label>
                        <select 
                            id="countries" 
                            className="shadow-sm rounded-md border border-gray-300 focus:ring-redPrincipal-900 focus:border-redPrincipal-900 block w-full p-2.5 dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-redPrincipal-900 dark:focus:border-redPrincipal-900"
                            required
                        >
                            <option selected>Choose a category</option>
                            <option value="salgados">Salgados</option>
                            <option value="doces">Doces</option>
                            <option value="bebidas">Bebidas</option>
                        </select>
                    </div>

                    <Button type="submit" texto="Register product" colorButton="bg-black" tamanho="md" onClick={()=>{}} />
                </form>
            </div>
        </>

    )
}