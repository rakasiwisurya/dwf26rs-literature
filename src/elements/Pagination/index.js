import "./index.scss";

export default function Pagination(props) {
  const { literaturePerPage, totalLiterature, paginate, currentPage } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLiterature / literaturePerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(totalLiterature);

  return (
    <nav className="mt-4">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div
              className={`page-link ${currentPage === number && "active"}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                paginate(number);
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
