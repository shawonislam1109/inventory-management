import { MailOutlined } from "@ant-design/icons";

export const purchaseItems = {
  key: "purchaseItem",
  label: "purchase",
  icon: <MailOutlined />,
  children: [
    { key: "purchase", label: "Purchase Add" },
    { key: "purchase/list", label: "Purchase List" },
  ],
};
