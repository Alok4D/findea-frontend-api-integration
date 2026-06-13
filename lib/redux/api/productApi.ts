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
  brand?: string;
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  booked?: boolean;
  sortBy?: string;
  search?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append("page", params.page.toString());
        if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());
        if (params.category) queryParams.append("category", params.category);
        if (params.brand) queryParams.append("brand", params.brand);
        if (params.type) queryParams.append("type", params.type);
        if (params.location) queryParams.append("location", params.location);
        if (params.minPrice !== undefined) queryParams.append("minPrice", params.minPrice.toString());
        if (params.maxPrice !== undefined) queryParams.append("maxPrice", params.maxPrice.toString());
        if (params.minRating !== undefined) queryParams.append("minRating", params.minRating.toString());
        if (params.inStock !== undefined) queryParams.append("inStock", params.inStock.toString());
        if (params.booked !== undefined) queryParams.append("booked", params.booked.toString());
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
    getProductBySlug: builder.query<ApiProduct, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),
    addReview: builder.mutation<any, { productId: string; orderId: string; rating: number; comment: string }>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Product", id: productId }],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetProductsQuery, 
  useGetCategoriesQuery, 
  useGetProductBySlugQuery,
  useAddReviewMutation
} = productApi;
