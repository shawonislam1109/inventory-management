import api from "../../api/apiConfig";

export const supplierApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSupplier: build.query({
      query: () => {
        return {
          url: "/supplier",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetSupplierQuery } = supplierApi;
