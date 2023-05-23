import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [

    "AllUser",
    "User",
    "DeleteUser",
    "UpdateUser",
    "AllProducts",
    "Product",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    
  ],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () =>`/user`,
      providesTags: ["AllUser"],
    }),

    getUser: build.query({
    query: (id) =>`user/${id}`,
    providesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
        providesTags: ["DeleteUser"]
      }),
    }),
    updateUser: build.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "PUT",
        providesTags: ["UpdateUser"]
      }),

    }),
    
    getAllProducts: build.query({
      query: () => "/product",
      providesTags: ["AllProducts"],
    }),

    getProduct: build.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"],
    }),

    getAllCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["AllCustomers"],
    }),

    getCustomerById: build.query({
       query: (pseudo) => `client/customers/${pseudo}`,
       providesTags: ["Customers"],
     }),

    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),

    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetCustomersQuery,
  useGetAllCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
