import { useHistory } from "react-router";
import { pdfjs, Document, Page } from "react-pdf";
import "./index.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfLiterature(props) {
  const { attachment, literatureId, title, author, publication_date } = props;

  const history = useHistory();

  return (
    <div
      className="pdf-literature"
      onClick={() => {
        history.push(`/detail/${literatureId}`);
      }}
    >
      <div className="d-flex justify-content-center">
        <Document file={attachment}>
          <Page pageNumber={1} width={200} height={270} className="rounded" />
        </Document>
      </div>
      <h3 className="h5 fw-bold text-truncate my-3">{title}</h3>
      <div className="d-flex justify-content-between text-muted">
        <div className="author">{author}</div>
        <div className="publication-year">{publication_date.split("-")[0]}</div>
      </div>
    </div>
  );
}
