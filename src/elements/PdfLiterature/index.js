export default function PdfLiterature(props) {
  const { attachment, title, author, publication_date } = props;

  return (
    <div className="pdf-literature" style={{ width: 200 }}>
      <iframe src={attachment} title={title} width="200" height="270" />
      <h3 className="h6 fw-bold text-truncate">{title}</h3>
      <div className="d-flex justify-content-between text-muted">
        <div className="author">{author}</div>
        <div className="publication-year">{publication_date.split("-")[0]}</div>
      </div>
    </div>
  );
}
