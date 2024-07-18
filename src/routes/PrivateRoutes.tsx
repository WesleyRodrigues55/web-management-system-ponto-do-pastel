
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage";
import { DashBoard } from "../pages/Dashboard";
import { Product } from "../pages/Products";
import { ListProducts } from "../pages/products/ListProducts";
import { EditProduct } from "../pages/products/EditProduct";
import { RegisterProduct } from "../pages/products/RegisterProduct";
import { Inventory } from "../pages/Inventory";
import { ListInventory } from "../pages/inventory/ListInventory";
import { RegisterInventory } from "../pages/inventory/RegisterInventory";
import { EditInventory } from "../pages/inventory/EditInventory";

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
            element: <ListProducts />,
          },
          {
            path: 'update/:id',
            element: <EditProduct />,
          },
          {
            path: "register/",
            element: <RegisterProduct />,
          },
          
        ],
      },
      {
        path: "/inventory",
        element: <Inventory />,
        children: [
          {
            index: true,
            element: <ListInventory />,
          },
          {
            path: 'update/:id',
            element: <EditInventory />,
          },
          {
            path: "register/",
            element: <RegisterInventory />,
          },
          
        ],
      },
    ],
  };
}