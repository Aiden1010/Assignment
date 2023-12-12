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

  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={pageNo === 1 || loading}>
        Previous
      </button>
      <span>
        Page {pageNo} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={pageNo === totalPages || loading}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
