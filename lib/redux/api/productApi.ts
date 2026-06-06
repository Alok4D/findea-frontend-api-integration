import { baseApi } from "./baseApi";

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
  categoryId: string;
  isActive: boolean;
  lowStockAlert: boolean;
  createdAt: string;
  updatedAt: string;
  category: ApiCategory;
  images: any[];
}

export interface ProductsResponse {
  data: ApiProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  search?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.category) queryParams.append("category", params.category);
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.search) queryParams.append("search", params.search);
        
        return `/products?${queryParams.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getCategories: builder.query<ApiCategory[], void>({
      query: () => "/products/categories",
      providesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productApi;
