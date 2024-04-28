
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage";
import { DashBoard } from "../pages/Dashboard";
import { Product } from "../pages/Products";
import { ListProducts } from "../pages/products/ListProducts";
import { EditProduct } from "../pages/products/EditProduct";
import { RegisterProduct } from "../pages/products/RegisterProduct";

export default function privateRoutes() {
  return {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // path: "/",
        element: <DashBoard />,
      },
      {
        path: "/products",
        element: <Product />,
        children: [
          {
            index: true,
            // path: "/products",
            element: <ListProducts />,
          },
          {
            path: 'update/:id',
            element: <EditProduct />,
          },
          {
            path: "register/:id",
            element: <RegisterProduct />,
          },
          
        ],
      },
    ],
  };
}