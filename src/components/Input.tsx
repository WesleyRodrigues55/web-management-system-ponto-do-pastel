interface InputProps {
    label?: string;
    typeInput: string;
    idAndNameInput: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: any) => void;
    onkeydown?: (e: any) => void;
    readonly?: boolean
}

export default function Input( { label, typeInput, idAndNameInput, placeholder, value, readonly, onChange, onkeydown} : InputProps) {
 
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
                    value={value}
                    onChange={onChange}
                    required
                ></textarea>
            : <input 
                    type={typeInput} 
                    id={idAndNameInput}
                    name={idAndNameInput}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#C60606] focus:border-[#C60606]" 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    onKeyDown={onkeydown}
                    required 
                    readOnly={readonly ? true : false}
                />
            }
        </div>
    )
}