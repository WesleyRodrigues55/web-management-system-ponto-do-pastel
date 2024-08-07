import axios from "axios";
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    itemId: string
}

export default function Modal({ isOpen, onClose, itemId  } : ModalProps) {
  const url = import.meta.env.VITE_URL_BASE_DEV;
  const token = localStorage.getItem("token");
  
  // const [data, setData] = useState([])

  // const fetchOrder = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${url}cart/get-cart-by-id/${itemId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             ContentType: "application/json",
  //           },
  //         }
  //       );
  //       setData(response.data.results);
  //       console.log(response.data.results);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };


  if (!isOpen) return null;

  return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-xl w-full">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Edit product</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  Fechar
                </button>
              </div>

              <div>
                <p>ID: {itemId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
 
};
