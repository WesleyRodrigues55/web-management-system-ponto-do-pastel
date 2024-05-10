interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    itemId: string
}

export default function Modal({ isOpen, onClose, itemId  } : ModalProps) {

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
                  <p>My modal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
 
};
