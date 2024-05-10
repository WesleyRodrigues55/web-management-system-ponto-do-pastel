import logo from '../assets/img/logo.png';
import Button from './Button';

interface NavProps {
    toggleSidebarMobile: () => void;
    isSidebarHidden: Boolean;
  }

export function Nav({ toggleSidebarMobile, isSidebarHidden }: NavProps) {

    return (
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button id="toggleSidebarMobile" aria-expanded={!isSidebarHidden} aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded" onClick={toggleSidebarMobile}>
                            <svg id="toggleSidebarMobileHamburger" className={isSidebarHidden ? "w-6 h-6" : "w-0 h-0"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg id="toggleSidebarMobileClose" className={!isSidebarHidden ? "w-6 h-6" : "w-0 h-0"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                    <img src={logo} className="h-12 mr-2" alt="Ponto do Pastel Logo" />
                    <span className="self-center whitespace-nowrap">Ponto do Pastel</span>
                    </a>
                    </div>
                    <div className="flex items-center">
                        <Button 
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login'
                            }} 
                            texto='Logout' 
                            colorButton="bg-redPrincipal-900" 
                            type='button'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}