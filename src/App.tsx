import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";

import PrivateRoutes from "./routes/PrivateRoutes.tsx";
import PublicRoutes from "./routes/PublicRoutes.tsx";

import { Login } from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

export default function App() {
    const [isTrue, setIsTrue] = useState([])

    useEffect(() => {
    const fetchisTrue = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }

        try {
            const response = await axios
            .post(
                `${import.meta.env.VITE_URL_BASE}auth/validar-token`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'application/json'
                    }
                }
            );
            setIsTrue(response.data['validado']);
        } catch (error) {
            console.error('Error fetching isTrue:', error);
        }
    };

    fetchisTrue();
    }, [])

    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return token !== null && isTrue;
    };

    const router = createBrowserRouter([
        isAuthenticated() ? PrivateRoutes() : { path: "/", element: <Login />, errorElement: <ErrorPage />, },
        ...PublicRoutes(),
    ]);

    return <RouterProvider router={router} />
}
