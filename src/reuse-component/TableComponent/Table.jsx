import { useMemo } from "react";
import RenderRowAndColumn from "./TableComponent";
import { useState } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DownloadOutlined,
  FileExcelOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { RefreshOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import useDialog from "../../hooks/useDialog";
import {
  ColumnVisibilityCom,
  DebouncedInput,
  IndeterminateCheckbox,
} from "../../third-party/ReactTableComponentRender";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

function TableComponent({
  title,
  isLoading,
  allDataCount,
  subheader,
  refetch,
  hasPrintMenuBtn = true,
  addBtnLabel = true,
  handleAddButton,
  tableColumns = [],
  tableDependency = [],
  tableData = [],
  // isServerPagination,
}) {
  // pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // column visibility state
  const [columnVisibility, setColumnVisibility] = useState();

  // RowSelection
  const [rowSelection, setRowSelection] = useState({});

  // LOCAL STATE
  const [data] = useState([...tableData]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        ...(tableColumns?.length > 0 && {
          id: "select",
          header: ({ table }) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <div className="px-1">
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            </div>
          ),
        }),
      },
      ...tableColumns,
    ],
    [...tableDependency]
  );

  // TAN STACK TABLE IMPORT
  const {
    getHeaderGroups,
    getRowModel,
    getState,
    setPageSize,
    getCanPreviousPage,
    firstPage,
    previousPage,
    getCanNextPage,
    nextPage,
    getPageCount,
    lastPage,
    options,
    setPageIndex,
    getAllColumns,
  } = useReactTable({
    columns,
    data,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    state: {
      pagination,
      columnVisibility,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    enableSubRowSelection: true,
  });

  // useDialog destructuring
  const {
    // open,
    // handleDialogClose,
    // handleDialogOpen,
    handleClickPrintMenu,
    printMenu,
    openPrintMenu,
    handleClosePrintMenu,
    // drawerOpen,
    // handleDrawerOpen,
    // handleDrawerClose,
  } = useDialog();

  return (
    <Box component={Paper} p={2}>
      <Stack
        flexWrap="wrap"
        alignItems="center"
        gap={1}
        direction="row"
        justifyContent="space-between"
        p={1}
      >
        <Stack>
          <Stack direction="row" gap={0.7}>
            <Typography sx={{ fontSize: "2rem" }}>{title}</Typography>
          </Stack>
          <Typography>
            {subheader} :{" "}
            {allDataCount
              ? allDataCount
              : isLoading
              ? 0
              : options.data.length || 0}
          </Typography>
        </Stack>

        {/* GLOBAL FILTER */}
        <DebouncedInput
          value={globalFilter ?? ""}
          options={options}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />

        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
          {/* IF HEADER HAS AN EXTRA CONTENT */}
          {/* {endHeaderContent && endHeaderContent} */}

          {/* TABLE COLUMN VISIBILITY MENU */}

          <ColumnVisibilityCom {...{ getAllColumns }} />

          {/* REFRESH BUTTON */}
          {Boolean(refetch) && (
            <Tooltip
              arrow
              title={isLoading ? "Refreshing..." : "Refresh Data"}
              TransitionComponent={Fade}
            >
              <LoadingButton
                onClick={() => {
                  refetch();
                }}
                variant="outlined"
                color="warning"
                loading={isLoading}
                sx={{ minWidth: "auto", padding: "6.5px" }}
              >
                <RefreshOutlined sx={{ fontSize: "1.2rem" }} />
              </LoadingButton>
            </Tooltip>
          )}

          {/* DOWNLOAD MENU BUTTON */}
          {hasPrintMenuBtn && (
            <Box textAlign="left">
              <Tooltip arrow title="Download Menu" TransitionComponent={Fade}>
                <Button
                  onClick={handleClickPrintMenu}
                  color="info"
                  variant="outlined"
                  sx={{ minWidth: "auto", padding: "9px" }}
                >
                  <DownloadOutlined />
                </Button>
              </Tooltip>
            </Box>
          )}

          {/* ADD MODULE BUTTON */}
          {addBtnLabel && (
            <Tooltip arrow title={`Add ${title}`}>
              <Button
                variant="outlined"
                onClick={handleAddButton}
                sx={{ minWidth: "auto", padding: "9px" }}
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
          )}

          {/* PRINT MENU */}
          {hasPrintMenuBtn && (
            <Menu
              id="Download-print-menu"
              anchorEl={printMenu}
              open={openPrintMenu}
              onClose={handleClosePrintMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                sx={{
                  boxShadow: "10px",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <Stack direction="row">
                  {/* CSV EXPORT */}
                  <Box textAlign="left">
                    <IconButton sx={{ pt: 1.6 }}>
                      {/* <CSVExport
                        style={{ color: "warning" }}
                        data={
                          selectedFlatRows.length > 0
                            ? selectedFlatRows
                                .map((d) => d.original)
                                .filter((d) => d !== undefined)
                            : data
                        }
                        filename={"umbrella-table.csv"}
                        headers={headers}
                      /> */}
                    </IconButton>
                  </Box>
                  {/* PRINT BUTTON */}
                  <Box textAlign="left">
                    <Tooltip arrow title="Print" TransitionComponent={Fade}>
                      <IconButton
                        // onClick={handleDialogOpen}
                        color="primary"
                        size="large"
                      >
                        <PrinterOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {/* EXCEL EXPORT  BUTTON */}
                  <Box textAlign="left">
                    <Tooltip arrow title="Excel" TransitionComponent={Fade}>
                      <IconButton
                        // onClick={onDownload}
                        color="success"
                        size="large"
                      >
                        <FileExcelOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </MenuItem>
            </Menu>
          )}
        </Stack>
      </Stack>

      {/* ROW AND COLUMNS RENDERING  */}
      <Stack>
        <RenderRowAndColumn
          {...{
            data,
            columns,
            getHeaderGroups,
            getRowModel,
            getState,
            setPageSize,
            getCanPreviousPage,
            firstPage,
            previousPage,
            getCanNextPage,
            nextPage,
            getPageCount,
            lastPage,
            setPageIndex,
          }}
        />
      </Stack>
    </Box>
  );
}

TableComponent.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  allDataCount: PropTypes.number,
  subheader: PropTypes.string,
  refetch: PropTypes.func,
  hasPrintMenuBtn: PropTypes.func,
  addBtnLabel: PropTypes.bool,
  handleAddButton: PropTypes.func,
  tableColumns: PropTypes.array,
  tableDependency: PropTypes.array,
  tableData: PropTypes.array,
};

export default TableComponent;