import { lazy } from "react";
import Supplier from "../pages/inventory/supplier/Supplier.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Trash from "../pages/Trash/Trash.jsx";
const Product = lazy(() => import("../pages/inventory/product/Product.jsx"));

const mainRoutes = [
  {
    path: "/products",
    children: [
      {
        path: "",
        element: <Product />,
      },
    ],
  },
  {
    path: "/supplier",
    children: [
      {
        path: "",
        element: <Supplier />,
      },
    ],
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/trash",
    children: [
      {
        path: "",
        element: <Trash />,
      },
    ],
  },
];

export default mainRoutes;
