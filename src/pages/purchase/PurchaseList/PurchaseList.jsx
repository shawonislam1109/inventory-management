import { Box } from "@mui/material";

import { DeleteFilled } from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import useDialog from "../../../hooks/useDialog";
import { useState } from "react";
import { useGetProductPurchaseQuery } from "../../../api/service/Purchase.service";
import TableComponent from "../../../reuse-component/TableComponent/Table";
import ActionCell from "../../../reuse-component/TableComponent/ActionCell";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const PurchaseList = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();
  // LOCAL STATE FOR PAGINATION
  const [productPurchasePagination, setProductPurchasePagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // USE DIALOG HOOKS

  const { handleDialogOpen, handleDeleteDialogOpen } = useDialog();

  // LOCAL STATE
  const [isUpdate, setUpdate] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [singleData, setSingleData] = useState({});

  //   productPurchase  DATA FROM QUERY
  const { data: productPurchase, isLoading: productPurchaseIsLoading } =
    useGetProductPurchaseQuery(
      { productPurchasePagination },
      {
        skip: !user,
      }
    );

  // HANDLE ADD BUTTON
  const handleAddButton = () => {
    setUpdate(false);
    setDefaultValues();
    handleDialogOpen();
  };

  //   const deleteHandleSubmission = () => {};

  // Table columns
  const tableColumns = [
    {
      header: "wholeSalePrice",
      accessorKey: "wholeSalePrice",
    },
    {
      header: "payment Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "paymentStatus",
      accessorKey: "paymentStatus",
    },
    {
      header: "memoNo",
      accessorKey: "memoNo",
    },
    {
      header: "totalDiscount",
      accessorKey: "totalDiscount",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={true}
              row={row}
              isExpandable={false}
              //   setOpen={(data) => updateProductHandler(data)}
              permissionKey="Product"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                  //   handleClick: deleteProductHandler,
                },
                {
                  title: "Invoice",
                  icon: <ReceiptOutlinedIcon />,
                  //   handleClick: deleteProductHandler,
                },
              ]}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <TableComponent
        {...{
          title: "Product Purchase",
          subheader: "Product Purchase of list",
          tableColumns,
          tableData: productPurchase?.data || [],
          isLoading: productPurchaseIsLoading,
          handleAddButton,
          addBtnLabel: true,
          allDataCount: productPurchase?.totalDocument,
          totalPages: productPurchase?.totalPages,
          currentPage: productPurchase?.currentPage,
          serverPaginationPageIndex: productPurchasePagination,
          SetServerPaginationPageIndex: setProductPurchasePagination,
          isServerPagination: true,
        }}
      />

      {/* delete dialog handler */}
    </Box>
  );
};

export default PurchaseList;
