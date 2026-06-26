import { baseApi } from "./baseApi";

interface Overview {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  fulfilledOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: string;
  status: string;
  createdAt: string;
}

interface TopProduct {
  productId: string;
  productName: string;
  _sum: { quantity: number };
}

interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  imageUrl: string;
}

export interface AdminStats {
  overview: Overview;
  ordersByStatus: Record<string, number>;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  lowStockProducts: LowStockProduct[];
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
    }),
  }),
});

export const { useGetAdminStatsQuery } = adminApi;
