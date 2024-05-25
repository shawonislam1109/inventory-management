import { lazy } from "react";
import Supplier from "../pages/inventory/supplier/Supplier.jsx";
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
];

export default mainRoutes;
