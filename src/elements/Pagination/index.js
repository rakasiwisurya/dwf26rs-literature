import "./index.scss";

export default function Pagination(props) {
  const { literaturesPerPage, totalLiterature, paginate, currentPage } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLiterature / literaturesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div
              className={`page-link ${currentPage === number && "active"}`}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                paginate(number);
                console.log(e);
              }}
            >
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
