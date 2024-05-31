import CustomTabs from "../../utils/tabs/CustomTabs";

import SupplierTrash from "./SupplierTrash";

const Trash = () => {
  // TABS ITEMS
  const tabsItems = ["Supplier"];

  // TABS COMPOENT
  const tabPanels = [
    {
      component: <SupplierTrash />,
    },
  ];

  return (
    <div>
      <CustomTabs {...{ tabPanels, tabsItems }} />
    </div>
  );
};

export default Trash;
