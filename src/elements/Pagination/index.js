import "./index.scss";

export default function Pagination({
  literaturesPerPage,
  totalLiterature,
  paginate,
}) {
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
              className="page-link"
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
