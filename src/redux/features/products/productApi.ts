import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (filterOptions) => ({
        url: `/products${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (ProductData) => ({
        url: "/product",
        method: "POST",
        body: ProductData,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    updatedProduct: builder.mutation({
      query: (updatedData) => ({
        url: `/product/${updatedData.id}`,
        method: "PUT",
        body: updatedData.productData,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    duplicateProduct: builder.mutation({
      query: (updatedData) => ({
        url: `/duplicate/${updatedData.id}`,
        method: "POST",
        body: updatedData.productData,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    deleteProduct: builder.mutation({
      query: (Data) => ({
        url: `/product/${Data}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),
    bulkDeleteProduct: builder.mutation({
      query: (data) => ({
        url: "/bulk-delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdatedProductMutation,
  useDuplicateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useBulkDeleteProductMutation,
} = productApi;
