import { lazy } from "react";
import Supplier from "../pages/inventory/supplier/Supplier.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Trash from "../pages/Trash/Trash.jsx";
import Category from "../pages/inventory/product/category/Category.jsx";
import ProductAddAndUpdate from "../pages/inventory/product/product-add/AddProduct.jsx";
import Stock from "../pages/stock/Stock.jsx";
import ProductPurchase from "../pages/purchase/AddPurchase.jsx";
import PurchaseList from "../pages/purchase/PurchaseList/PurchaseList.jsx";
const Product = lazy(() => import("../pages/inventory/product/Product.jsx"));

const mainRoutes = [
  // @PRODUCT ROUTES
  {
    path: "/products",
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "addAndUpdate",
        element: <ProductAddAndUpdate />,
      },
      {
        path: "addAndUpdate/:productId",
        element: <ProductAddAndUpdate />,
      },
    ],
  },

  // @SUPPLIER ROUTES
  {
    path: "/supplier",
    children: [
      {
        path: "",
        element: <Supplier />,
      },
    ],
  },

  // DASHBOARD ROUTES
  {
    path: "",
    children: [
      {
        path: "",
        element: <Dashboard />,
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

  // TRASH ROUTES
  {
    path: "/trash",
    children: [
      {
        path: "",
        element: <Trash />,
      },
    ],
  },

  // @CATEGORY ROUTES

  {
    path: "/category",
    children: [
      {
        path: "",
        element: <Category />,
      },
    ],
  },

  // @STOCKS DATA
  {
    path: "stocks",
    children: [
      {
        path: "",
        element: <Stock />,
      },
    ],
  },

  // @PRODUCT PURCHASE
  {
    path: "purchase",
    children: [
      {
        path: "",
        element: <ProductPurchase />,
      },
      {
        path: "list",
        element: <PurchaseList />,
      },
    ],
  },
];

export default mainRoutes;
