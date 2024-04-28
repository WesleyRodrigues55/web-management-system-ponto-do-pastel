import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";

import PrivateRoutes from "./routes/PrivateRoutes.tsx";
import PublicRoutes from "./routes/PublicRoutes.tsx";
import { Login } from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

// aqui pego o token do localStorage assim que o usuário fizer a sessão.
const authorization = false;

const router = createBrowserRouter([
  authorization ? PrivateRoutes() : { path: "/", element: <Login />, errorElement: <ErrorPage />, },
  ...PublicRoutes(),
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
