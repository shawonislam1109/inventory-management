import { MailOutlined } from "@ant-design/icons";

export const employeeItem = {
  key: "sub1",
  label: "Navigation One",
  icon: <MailOutlined />,
  children: [
    {
      key: "g1",
      label: "Item 1",
      type: "group",
      children: [
        { key: "1", label: "Option 1" },
        { key: "2", label: "Option 2" },
      ],
    },
    {
      key: "g2",
      label: "Item 2",
      type: "group",
      children: [
        { key: "3", label: "Option 3" },
        { key: "4", label: "Option 4" },
      ],
    },
  ],
};
