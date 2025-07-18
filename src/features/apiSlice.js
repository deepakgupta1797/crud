import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://crud-ovcw.onrender.com/' }),
  endpoints: builder => ({
    getItems: builder.query({
      query: () => '/items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Item', id })),
              { type: 'Item', id: 'LIST' },
            ]
          : [{ type: 'Item', id: 'LIST' }],
    }),
    addItem: builder.mutation({
      query: (item) => ({
        url: '/items',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: [{ type: 'Item', id: 'LIST' }],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Item', id },
        { type: 'Item', id: 'LIST' }
      ],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Item', id },
        { type: 'Item', id: 'LIST' },
      ],
    })
  })
});

export const { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation } = apiSlice;
