
import ErrorPage from "../pages/ErrorPage";
import { Login } from "../pages/Login";

export default function PublicRoutes() {
  return  [{
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  }];
}