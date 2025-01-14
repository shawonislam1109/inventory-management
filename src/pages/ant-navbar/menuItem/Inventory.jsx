import { MailOutlined } from "@ant-design/icons";

export const inventoryItems = {
  key: "inventory",
  label: "Inventory",
  icon: <MailOutlined />,
  children: [
    { key: "products", label: "Product List", url: "/products" },
    { key: "supplier", label: "Supplier" },
    { key: "category", label: "Category" },
    { key: "stocks", label: "Stocks" },
  ],
};
