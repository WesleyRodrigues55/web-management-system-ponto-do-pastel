import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Nav } from '../components/Nav';
import { Aside } from '../components/Aside';
import Footer from '../components/Footer';

export default function Root() {

    const [isSidebarHidden, setIsSidebarHidden] = useState(true);

    const toggleSidebarMobile = () => {
      setIsSidebarHidden(!isSidebarHidden);
    };
  
    const handleBackdropClick = () => {
      if (!isSidebarHidden) {
        setIsSidebarHidden(true);
      }
    };

    return (
        <>
            <div>
                <Nav toggleSidebarMobile={toggleSidebarMobile} isSidebarHidden={isSidebarHidden}/>

                <div className={`flex overflow-hidden bg-grey-200 pt-16 ${!isSidebarHidden ? 'bg-opacity-50' : ''}`} onClick={handleBackdropClick}>

                    <Aside isSidebarHidden={isSidebarHidden} />

                    <div className={`bg-gray-900 opacity-50 fixed inset-0 z-10 ${!isSidebarHidden ? '' : 'hidden'}`} onClick={handleBackdropClick}></div>
                    <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                        <main>
                            <div className="pt-6 px-4">

                                <Outlet />
                            
                            </div>
                        </main>

                        <Footer />

                    </div>
                </div>
            
            </div>
        </>
    )

}