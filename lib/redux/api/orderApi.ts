import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    trackOrder: builder.query<any, string>({
      query: (orderNumber) => `/orders/track/${orderNumber}`,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation, useTrackOrderQuery } = orderApi;
