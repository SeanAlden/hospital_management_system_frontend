// components/Pagination.jsx
import React from "react";

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  perPageOptions = [5, 10, 20, 50],
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const makePages = () => {
    // returns array of page items: numbers or '...'
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // if near start
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    // if near end
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    // middle
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = makePages();

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(totalItems, currentPage * itemsPerPage);

  const gotoPage = (p) => {
    if (p === '...') return;
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Show</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm"
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">items</span>
      </div> */}

      {/* <div className="text-sm text-gray-600 hidden sm:block">
        {`Showing ${startIndex === 0 ? 0 : startIndex} to ${endIndex} of ${totalItems} entries`}
      </div> */}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 bg-white rounded-md border text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Prev
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-3 py-1 text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => gotoPage(p)}
                className={`px-3 py-1 rounded-md border text-sm ${p === currentPage ? "bg-blue-600 text-white" : "hover:bg-white"}`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 bg-white rounded-md border text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
