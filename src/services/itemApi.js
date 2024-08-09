// src/services/itemApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => 'items',
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: 'items',
        method: 'POST',
        body: newItem,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `items/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;