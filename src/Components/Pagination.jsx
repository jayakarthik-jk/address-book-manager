function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= pageSize) return null;
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handlePageChange = (page) => {
    if (page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  return (
    <nav
      aria-label="..."
      className="d-flex justify-content-center align-items-center"
    >
      <ul className="pagination pagination-sm">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          aria-current="page"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span className="page-link">{"<"}</span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current="page"
            onClick={() => handlePageChange(page)}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pagesCount ? "disabled" : ""
          }`}
          aria-current="page"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="page-link">{">"}</span>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
