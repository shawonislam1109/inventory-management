import { AppstoreOutlined } from "@ant-design/icons";

export const dashboardItem = {
  key: "dashboard",
  label: "Dashboard",
  icon: <AppstoreOutlined />,
  children: [
    { key: "5", label: "Option 5" },
    { key: "6", label: "Option 6" },
    {
      key: "sub3",
      label: "Submenu",
      children: [
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
  ],
};
