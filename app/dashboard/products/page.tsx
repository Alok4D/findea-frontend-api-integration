"use client";

import { useState } from "react";
import ProductsHeader from "./_components/ProductsHeader";
import ProductsFilter from "./_components/ProductsFilter";
import ProductsTable from "./_components/ProductsTable";
import { useGetProductsQuery, ProductsQueryParams } from "@/lib/redux/api/productApi";

export default function ProductManagementPage() {
  const [queryParams, setQueryParams] = useState<ProductsQueryParams>({
    page: 1,
    limit: 10,
    search: "",
    category: "",
  });

  const { data, isLoading, isFetching } = useGetProductsQuery(queryParams);

  return (
    <div className="mx-auto max-w-full pb-16">
      <ProductsHeader />
      <ProductsFilter 
        queryParams={queryParams} 
        setQueryParams={setQueryParams} 
      />
      <ProductsTable 
        products={data?.data || []} 
        isLoading={isLoading || isFetching} 
      />
    </div>
  );
}
