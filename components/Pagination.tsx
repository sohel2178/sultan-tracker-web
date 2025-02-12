"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalItems: number; // Total items
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString().toLowerCase(),
    });

    router.push(newUrl, { scroll: false });
  };

  const onItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "pageSize",
      value: itemsPerPage.toString().toLowerCase(),
    });

    router.push(newUrl, { scroll: false });
  };

  const generatePageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex justify-end gap-3">
      {/* Pagination Controls */}

      <div className="flex flex-1 flex-col items-center gap-3">
        <div
          className={cn(
            "flex overflow-auto whitespace-nowrap",
            generatePageNumbers().length === 7 ? "gap-1" : "gap-2",
            "sm:gap-2"
          )}
        >
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="shrink-0 rounded border px-1.5 py-1 disabled:opacity-50 md:px-3 md:py-2"
          >
            {"<"}
          </button>

          {/* Page Numbers */}
          {generatePageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`shrink-0 rounded border px-1.5 py-1 md:px-3 md:py-2 ${
                  currentPage === page
                    ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
                    : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                className="shrink-0 px-1.5 py-1 md:px-3 md:py-2"
              >
                ...
              </span>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="shrink-0 rounded border px-1.5 py-1 disabled:opacity-50 md:px-3 md:py-2"
          >
            {">"}
          </button>
        </div>

        {/* Results Info */}
        <p className="text-sm">
          Results: {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </p>
      </div>

      {/* Items Per Page Dropdown */}
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="size-[50px] rounded border p-1"
      >
        {[10, 20, 50, 100].map((size) => (
          <option key={size} value={size} className="text-xs">
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
