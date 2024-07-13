import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import useAuth from "../../hooks/useAuth";
import { convertToLabel } from "../../utils/convertToLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../api/service/product.service";
import useFormHook from "../../hooks/useHookForm";
import MainCard from "../../reuse-component/card/MainCard";
import { Checkbox, Grid, InputLabel, Stack, TextField } from "@mui/material";
import InputField from "../../reuse-component/InputComponent/Input";
import { useGetSupplierQuery } from "../../api/service/supplier.service";
import { paymentMethod, paymentStatus } from "../../utils/enums";

const DEFAULT_VALUES = {
  productType: "",
  productName: "",
  supplier: "",
  unit: "",
  productQuantity: {},
  purchasePrice: {},
  salePrice: {},
  totalPrice: 0,
  wholeSalePrice: 0,
};

const ProductPurchase = () => {
  // AUTH USE
  const { user } = useAuth();

  // REACT ROUTER DOM HOOKS
  const location = useLocation();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { productId } = useParams();

  // use searchParams
  const isUpdate = searchParams.get("isUpdate") === "true";

  // SEARCH QUERY
  const queryParams = () => {
    const params = new URLSearchParams(location.search);
    const queryObject = {};

    params.forEach((value, key) => {
      if (key == "pageSize" || key === "pageIndex") {
        queryObject[key] = parseInt(value);
      }
    });
    return queryObject;
  };

  // LOCAL STATE
  const [defaultValues, setDefaultVales] = useState({ ...DEFAULT_VALUES });
  const [unitState, setUnitState] = useState("");

  // Custom  function for unit
  const selectedUnit = (value) => {
    switch (value) {
      case "carton":
        return ["carton", "box", "pies", "pageUnit"];
      case "box":
        return ["box", "pies", "pageUnit"];
      case "pies":
        return ["pies", "pageUnit"];
      case "pageUnit":
        return ["pageUnit"];

      default:
        return [];
    }
  };

  // use supplier hooks
  const { supplier } = useGetSupplierQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { supplier: convertToLabel(data, "name", "_id"), ...rest };
    },
  });

  // ===================|| PRODUCTS QUERY  ||=====================
  const {
    data: products,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess,
  } = useGetProductQuery(
    { pageIndex: 0, pageSize: 10 },
    {
      skip: !user,
    }
  );

  // ===================|| RTK HOOKS MUTATION ||=====================
  const [
    createProduct,
    { isLoading: createProductIsLoading, isSuccess: createProductIsSuccess },
  ] = useCreateProductMutation();
  const [
    updateProduct,
    { isLoading: updateProductIsLoading, isSuccess: updateProductIsSuccess },
  ] = useUpdateProductMutation();

  // => SINGLE PRODUCT GET BY ID
  const { data: singleProduct } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  // VALIDATION
  const validationSchema = Yup.object().shape({
    date: Yup.string().required(),
    memoNo: Yup.string().required(),
    supplier: Yup.string().required("supplier is required"),
    paymentMethod: Yup.string().required(),
    paymentStatus: Yup.string().required(),
    productsId: Yup.array().required().min(1),
    wholeSalePrice: Yup.number()
      .required("Wholesale price is required")
      .min(0, "Wholesale price must be non-negative"),
  });

  // HANDLE USE HOOKS FORM
  const { handleSubmit, control, formState, watch, setError, setValue, reset } =
    useFormHook({
      validationSchema,
      defaultValuesProp: defaultValues,
    });

  //   FORM SUBMIT HANDLER
  const formSubmit = (data) => {
    console.log(data);
  };

  //   FORM DATA
  const formData = [
    {
      type: "date-picker",
      name: "date",
      label: "Date ",
      placeholder: "Enter Date",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "date",
    },
    {
      type: "text",
      name: "memoNo",
      label: "Memo No",
      placeholder: "Enter Product Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "productName",
    },
    {
      type: "single-select",
      name: "paymentMethod",
      label: "paymentMethod",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "paymentMethod",
      options: paymentMethod,
    },
    {
      type: "single-select",
      name: "paymentStatus",
      label: "paymentStatus",
      placeholder: "Name",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "paymentStatus",
      options: paymentStatus,
    },

    {
      type: "single-select",
      name: "supplier",
      label: "supplier",
      placeholder: "Enter supplier",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "supplier",
      options: supplier || [],
    },

    {
      type: "number",
      name: "wholeSalePrice",
      label: "Whole SalePrice",
      placeholder: "Enter WholeSalePrice",
      required: true,
      size: "small",
      visibility: true,
      disabled: false,
      id: "wholeSalePrice",
    },
  ];

  const column = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
  };

  // PRODUCT USE_EFFECT
  useEffect(() => {
    if (createProductIsSuccess || updateProductIsSuccess) {
      navigation("/products");
    }
  }, [createProductIsSuccess, updateProductIsSuccess]);

  // PRODUCT USE_EFFECT
  useEffect(() => {
    if (singleProduct) {
      setDefaultVales({ ...singleProduct });
    }
  }, [singleProduct]);

  // => THIS USE EFFECT USE FOR UNIT VALIDATION
  useEffect(() => {
    const schemaFields = selectedUnit(watch("unit")).reduce((acc, curr) => {
      if (curr) {
        acc[curr] = Yup.string().required(`${curr} is a required field`);
      }
      return acc;
    }, {});
    setUnitState(schemaFields);
  }, [watch("unit")]);

  console.log(watch("productsId"));

  return (
    <>
      <MainCard title="Product Purchase">
        <Stack component={"form"} onSubmit={handleSubmit(formSubmit)}>
          <Grid container spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputField
                formData={formData}
                column={column}
                control={control}
              />
              <Grid item xs={12} md={12} lg={12}>
                <Controller
                  name="productsId"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        {...field}
                        multiple
                        value={field.value}
                        onChange={(event, newValue) => {
                          field.onChange(newValue);
                        }}
                        size="medium"
                        id="productsId-tags-demo"
                        options={products?.data || []}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.productName}
                        renderOption={(props, option, { selected }) => {
                          const { key, ...optionProps } = props;
                          return (
                            <li key={key} {...optionProps}>
                              <Checkbox
                                icon={
                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.productName}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Product"
                            placeholder="Select "
                            error={error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>

          {/* PRODUCT MULTI-SELECTED */}

          {/*EACH PRODUCT QUANTITY   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Each Product Quantity"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`eachProductQuantity.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Product Quantity ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT QUANTITY   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Quantity"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`productQuantity.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Product Quantity ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT PURCHASE PRICE   */}
          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Purchase Price"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`purchasePrice.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Purchase Price ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}
          {/* PRODUCT SALE PRICE   */}

          {selectedUnit(watch("unit")).length > 0 && (
            <MainCard title={"Product Sale Price"}>
              <Grid container spacing={2}>
                {selectedUnit(watch("unit")).map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <InputLabel
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item}
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </InputLabel>

                      <Controller
                        control={control}
                        name={`salePrice.${item}`}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            size="small"
                            inputRef={field.ref}
                            type="number"
                            placeholder={`Enter Sale Price ${item}`}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(error)}
                            helperText={error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </MainCard>
          )}

          {/* SUBMIT BUTTON  */}
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
              mt={4}
            >
              <LoadingButton
                size="small"
                endIcon={<SendIcon />}
                loading={createProductIsLoading || updateProductIsLoading}
                loadingPosition="end"
                variant="contained"
                type="submit"
              >
                {isUpdate ? "Update" : "Submit"}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
};

ProductPurchase.propTypes = {};

export default ProductPurchase;
