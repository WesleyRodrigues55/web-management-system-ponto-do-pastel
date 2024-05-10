import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";


export default function UseModalExemple() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const openModal = () => {
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedItemId(null);
        setIsOpen(false);
    };

    return (
        <>
         <Button 
            texto={'Open modal!'} 
            colorButton='bg-blue-600'
            onClick={() => {
                setSelectedItemId(null);
                openModal();
            }} 
        />
        <Modal isOpen={isOpen} onClose={closeModal} itemId={selectedItemId!} />
        </>
    )
}