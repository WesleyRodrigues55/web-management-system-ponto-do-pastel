interface InputProps {
    label: string;
    typeInput: string;
    idAndNameInput: string;
    placeholder?: string;
}

export default function Input( { label, typeInput, idAndNameInput, placeholder} : InputProps) {
    return (
        <div className="mb-4">
            <label 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label}
            </label>
            {typeInput == "textarea" ? 
                <textarea
                    id={idAndNameInput}
                    name={idAndNameInput}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#C60606] focus:border-[#C60606]" 
                    placeholder={placeholder} 
                    required 
                ></textarea>
            : <input 
                    type={typeInput} 
                    id={idAndNameInput}
                    name={idAndNameInput}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#C60606] focus:border-[#C60606]" 
                    placeholder={placeholder} 
                    required 
                />
            }
        </div>
    )
}