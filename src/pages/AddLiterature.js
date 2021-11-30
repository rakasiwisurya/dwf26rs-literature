import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { pdfjs, Document, Page } from "react-pdf";

import { AuthContext } from "contexts/AuthContext";
import { API } from "config/api";

import Header from "components/Header";
import { InputFileLiterature, ModalConfirm } from "elements";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AddLiterature() {
  const history = useHistory();

  let date = new Date().toLocaleDateString("id-ID");
  const day = String(date.split("/")[0]).padStart(2, "0");
  const month = String(date.split("/")[1]).padStart(2, "0");
  const year = date.split("/")[2];
  date = `${year}-${month}-${day}`;

  const { state } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    userId: state.user?.id,
    publication_date: date,
    pages: "",
    isbn: "",
    author: "",
    attache: "",
  });

  console.log(form.publication_date);

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));

    if (e.target.type === "file") {
      const fileList = e.target.files;

      for (const file of fileList) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.set("attache", form.attache, form.attache.name);
      formData.set("title", form.title);
      formData.set("userId", form.userId);
      formData.set("publication_date", form.publication_date);
      formData.set("pages", form.pages);
      formData.set("isbn", form.isbn);
      formData.set("author", form.author);

      const response = await API.post("/literatures", formData, config);

      if (response?.status === 200) {
        setForm({
          title: "",
          userId: state.user?.id,
          publication_date: date,
          pages: "",
          isbn: "",
          author: "",
          attache: "",
        });

        setPreview(null);
        setShow(false);

        NotificationManager.success(
          response.data.message,
          response.data.status,
          4000,
          () => {
            history.push("/profile");
          }
        );
      }
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.message) {
        return NotificationManager.error(
          error.response.data.message,
          error.response.data.status
        );
      }
    }
  };

  return (
    <div className="add-literature">
      <Header />

      <main className="py-4">
        <div className="container">
          <h1 className="h3 fw-bold mb-4">Add Literature</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setShow(true);
            }}
          >
            <FloatingLabel className="mb-3" controlId="title" label="Title">
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={handleChange}
                value={form.title}
              />
            </FloatingLabel>
            <FloatingLabel
              className="mb-3"
              controlId="publication_date"
              label="Publication Date"
            >
              <Form.Control
                type="date"
                placeholder="Publication Date"
                onChange={handleChange}
                value={form.publication_date}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="pages" label="Pages">
              <Form.Control
                type="number"
                min="0"
                placeholder="Pages"
                onChange={handleChange}
                value={form.pages}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="isbn" label="ISBN">
              <Form.Control
                type="text"
                placeholder="ISBN"
                onChange={handleChange}
                value={form.isbn}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="author" label="Author">
              <Form.Control
                type="text"
                placeholder="Author"
                onChange={handleChange}
                value={form.author}
              />
            </FloatingLabel>

            <InputFileLiterature onChange={handleChange} />

            {preview && (
              <div className="mt-3">
                <Document file={preview}>
                  <Page
                    pageNumber={1}
                    width={200}
                    height={270}
                    className="rounded"
                  />
                </Document>
              </div>
            )}

            <div className="d-flex justify-content-end w-100">
              {form.title &&
              form.pages &&
              form.isbn &&
              form.author &&
              form.author &&
              form.attache ? (
                <Button variant="danger" type="submit" className="px-5 py-2">
                  Add Literature
                </Button>
              ) : (
                <Button variant="secondary" disabled className="px-5 py-2">
                  Add Literature
                </Button>
              )}
            </div>
          </Form>
        </div>
      </main>

      <ModalConfirm
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        handleProceed={handleSubmit}
      />
    </div>
  );
}
