import { NavLink , Outlet } from "react-router-dom";

export function Inventory() {
    return (
        <>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <NavLink to="/inventory" end  className={({ isActive }) => (isActive ? 'activeItem' : 'inactiveItem')}>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">List</span>
                                <h3 className="text-base font-normal text-gray-500">all inventory</h3>
                            </div>
                        </div>
                    </div>
                </NavLink >
                <NavLink to="register" end  className={({ isActive }) => (isActive ? 'activeItem' : 'inactiveItem')}>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Register</span>
                                <h3 className="text-base font-normal text-gray-500">a new product stock</h3>
                            </div>
                        </div>
                    </div>
                </NavLink >
                <NavLink to="export" end  className={({ isActive }) => (isActive ? 'activeItem' : 'inactiveItem')}>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Export Report</span>
                                <h3 className="text-base font-normal text-gray-500">for all inventory</h3>
                            </div>
                        </div>
                    </div>
                </NavLink >
            </div>

            <div className="mt-4 w-full">
                <Outlet />
            </div>
        </>
    )
}