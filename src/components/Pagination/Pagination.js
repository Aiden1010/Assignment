import "./Pagination.css";

const Pagination = ({ loading, pageNo, setPageNo, totalPages }) => {
  const prevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const nextPage = () => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const goToFirstPage = () => {
    if (pageNo !== 1) {
      setPageNo(1);
    }
  };

  const goToLastPage = () => {
    if (pageNo !== totalPages) {
      setPageNo(totalPages);
    }
  };

  return (
    <div className="pagination">
      <button onClick={goToFirstPage} disabled={pageNo === 1 || loading}>
        &lt;&lt;
      </button>
      <button onClick={prevPage} disabled={pageNo === 1 || loading}>
        &lt;
      </button>
      <span>
        Page {pageNo} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={pageNo === totalPages || loading}>
        &gt;
      </button>
      <button
        onClick={goToLastPage}
        disabled={pageNo === totalPages || loading}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
