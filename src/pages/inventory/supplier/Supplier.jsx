import { Box } from "@mui/material";
import ShowStatus from "../../../reuse-component/TableComponent/ShowStatus";
import ActionCell from "../../../reuse-component/TableComponent/ActionCell";
import { DeleteFilled } from "@ant-design/icons";
import TableComponent from "../../../reuse-component/TableComponent/Table";
import useAuth from "../../../hooks/useAuth";
import { useGetSupplierQuery } from "../../../api/service/supplier.service";

const Supplier = () => {
  // USE AUTH HOOKS
  const { user } = useAuth();

  //   SUPPLIER GET DATA FROM QUERY
  const { data: supplier, isLoading: supplierIsLoading } = useGetSupplierQuery(
    user?._id,
    {
      skip: !user,
    }
  );

  console.log(supplier);

  // Table columns
  const tableColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "contactNumber",
      accessorKey: "contactNumber",
    },
    {
      header: "tradeNumber",
      accessorKey: "tradeNumber",
    },
    {
      header: "presentAddress",
      accessorKey: "presentAddress",
    },
    {
      header: "status",
      accessorKey: "status",
      cell: ({ value }) => {
        return <ShowStatus value={value} size={"small"} />;
      },
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
              // setOpen={updateBrandHandler}
              permissionKey="supplier"
              menuItems={[
                {
                  title: "Delete",
                  icon: <DeleteFilled />,
                  // handleClick: handleDeleteBrandDialogOpen,
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
          title: "Supplier",
          subheader: "supplier of list",
          tableColumns,
          tableData: supplier,
          isLoading: supplierIsLoading,
        }}
      />
    </Box>
  );
};

export default Supplier;
