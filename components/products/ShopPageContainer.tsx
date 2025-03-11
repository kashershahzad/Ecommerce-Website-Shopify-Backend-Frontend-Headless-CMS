"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductViewChange from "../product/ProductViewChange";
import Pagination from "../others/Pagination";
import SingleProductListView from "@/components/product/SingleProductListView";
import { Product, SearchParams } from "@/types";
import SingleProductCartView from "../product/SingleProductCartView";
import { Loader2 } from "lucide-react";
import Loader from "../others/Loader";

interface ShopPageContainerProps {
  searchParams: SearchParams;
  gridColumn?: number;
  products: Product[];
}

const ShopPageContainer = ({
  searchParams,
  gridColumn,
  products,
}: ShopPageContainerProps) => {
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [paginatedData, setPaginatedData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.page) || 1
  );
  const itemsPerPage = 6;

  // Function to filter data based on search params
  const filterData = () => {
    console.log("Initial products for filtering:", products);
    let filteredProducts = [...products];

    // Filter by category
    if (searchParams.category) {
      filteredProducts = filteredProducts.filter(
        (product) => {
          const productCategory = (product.category || '').toLowerCase();
          const paramCategory = searchParams.category.toLowerCase();
          return productCategory.includes(paramCategory);
        }
      );
    }

    // Filter by brand
    if (searchParams.brand) {
      filteredProducts = filteredProducts.filter(
        (product) => {
          const productBrand = (product.brand || '').toLowerCase();
          const paramBrand = searchParams.brand.toLowerCase();
          return productBrand.includes(paramBrand);
        }
      );
    }

    // Filter by color if product has color property
    if (searchParams.color && filteredProducts.some(p => p.color)) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.isArray(product.color)
          ? product.color.some(c => c.toLowerCase() === searchParams.color.toLowerCase())
          : false
      );
    }

    // Filter by min and max price
    if (searchParams.min && searchParams.max) {
      const minPrice = parseFloat(searchParams.min);
      const maxPrice = parseFloat(searchParams.max);
      filteredProducts = filteredProducts.filter(
        (product) => {
          const productPrice = typeof product.price === 'string'
            ? parseFloat(product.price)
            : product.price;
          return productPrice >= minPrice && productPrice <= maxPrice;
        }
      );
    }

    console.log("Filtered products:", filteredProducts);
    return filteredProducts;
  };

  // Update filtered data whenever search params change
  useEffect(() => {
    setLoading(true);
    console.log("Search params changed:", searchParams);
    console.log("Products available:", products.length);

    if (products.length > 0) {
      const filteredProducts = filterData();
      setFilteredData(filteredProducts);
      setCurrentPage(Number(searchParams.page) || 1); // Reset pagination to first page when filters change
    } else {
      setFilteredData([]);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, products]);

  // change currentPage when searchparams page change
  useEffect(() => {
    setCurrentPage(Number(searchParams.page) || 1);
  }, [searchParams.page]);

  // Update paginated data whenever filtered data or pagination settings change
  useEffect(() => {
    setLoading(true);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredData.slice(startIndex, endIndex);
    setPaginatedData(paginatedProducts);
    setLoading(false);
  }, [filteredData, currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
        <Loader2 className="animate-spin text-xl" size={50} />
        <p>Loading products..</p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-xl mx-auto font-semibold space-y-4">
        <ProductViewChange
          listView={listView}
          setListView={setListView}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          itemPerPage={itemsPerPage}
          currentPage={currentPage}
        />
        <p>Sorry no products found with your filter selection</p>
        // eslint-disable-next-line react/no-unescaped-entities
        <p className="text-base text-gray-600">
          The category may not exist or the filters applied don't match any products.
        </p>
      </div>
    );
  }

  return (
    <div className="md:ml-4 p-2 md:p-0">
      {/* product status and filter options */}
      <ProductViewChange
        listView={listView}
        setListView={setListView}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        itemPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {/* showing product list or cart view based on state */}
      {listView === true && (
        <div className="max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 gap-4 lg:gap-6">
          {paginatedData.map((product) => (
            <SingleProductListView key={product.id} product={product} />
          ))}
        </div>
      )}

      {listView === false && (
        <div
          className={`max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridColumn || 3
            } overflow-hidden gap-4 lg:gap-6`}
        >
          {paginatedData.map((product) => (
            <SingleProductCartView key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* product pagination here */}
      <Suspense fallback={<Loader />}>
        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          pageName="page"
        />
      </Suspense>
    </div>
  );
};

export default ShopPageContainer;