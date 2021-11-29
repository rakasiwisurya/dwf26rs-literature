import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FloatingLabel, Form } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { pdfjs, Document, Page } from "react-pdf";

import Header from "components/Header";
import { ModalConfirm } from "elements";
import { donwloadPdf } from "utils/donwloadPdf";

import { API } from "config/api";
import { AuthContext } from "contexts/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DetailLiterature() {
  const { id } = useParams();
  const history = useHistory();

  const { state } = useContext(AuthContext);

  const [detailLiterature, setDetailLiterature] = useState(null);
  const [detailCollection, setDetailCollection] = useState(null);
  const [collected, setCollected] = useState(false);
  const [show, setShow] = useState(false);
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getDetailLiterature();
  }, []);

  const getDetailLiterature = async () => {
    try {
      const response = await API.get(`/literatures/${id}`);
      setDetailLiterature(response.data.data);
      setForm(response.data.data);

      const collections = await API.get(`/collections/${state.user?.id}`);
      const myCollect = collections.data.data.filter(
        (item) => item.literature.id === response.data.data.id
      );
      setDetailCollection(myCollect[0]);

      for (const myCollection of collections.data.data) {
        if (myCollection.literature.id === response.data.data.id) {
          setCollected(true);
        } else {
          setCollected(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollect = async () => {
    try {
      if (collected) {
        const response = await API.delete(
          `/collections/${detailCollection.id}`
        );

        if (response.status === 200) {
          NotificationManager.success(
            response.data.message,
            response.data.status
          );

          setCollected(false);
          getDetailLiterature();
        }
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          userId: state.user?.id,
          literatureId: detailLiterature.id,
        });

        const response = await API.post("/collections", body, config);

        if (response.status === 200) {
          NotificationManager.success(
            response.data.message,
            response.data.status,
            4000,
            () => {
              history.push("/collection");
            }
          );

          setCollected(true);
          getDetailLiterature();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await API.delete(`/literatures/${detailLiterature?.id}`);

      if (response.status === 200) {
        NotificationManager.success(
          response.data.message,
          response.data.status
        );

        history.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleUpdate = async () => {
    try {
      let response;

      if (typeof form.attache === "object") {
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

        response = await API.put(
          `/literature/${detailLiterature?.id}`,
          formData,
          config
        );
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          ...form,
          attache: form.attache.split("/")[5],
        });

        response = await API.put(
          `/literature/${detailLiterature?.id}`,
          body,
          config
        );
      }

      if (response.status === 200) {
        NotificationManager.success(
          response.data.message,
          response.data.status
        );

        getDetailLiterature();
        setEditable(false);
      }
    } catch (error) {
      console.log(error);
      if (error?.response.data?.message) {
        return NotificationManager.error(
          error.response.data.message,
          error.response.data.status
        );
      }
    }
  };

  const handleDownload = () => {
    donwloadPdf(detailLiterature.attache, String(detailLiterature.title));
    NotificationManager.success("Download starting...", "Success");
  };

  return (
    <div className="detail-literature">
      <Header />

      <main className="pt-4">
        <div className="container">
          <div className="row">
            <div
              className="col-auto position-relative"
              style={editable ? {} : { cursor: "pointer" }}
              onClick={
                editable
                  ? undefined
                  : () => {
                      window.open(detailLiterature?.attache);
                    }
              }
            >
              <Document file={preview ? preview : detailLiterature?.attache}>
                <Page
                  pageNumber={1}
                  width={295}
                  height={400}
                  className="rounded"
                />
              </Document>
              {editable && (
                <div className="pdf-edit">
                  <input
                    type="file"
                    name="attache"
                    id="attache"
                    aria-label="file upload"
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="attache" className="btn btn-info text-light">
                    Upload New PDF
                  </label>
                </div>
              )}
            </div>
            <div className="col ps-5">
              {editable ? (
                <>
                  <FloatingLabel
                    className="mb-3"
                    controlId="title"
                    label="Title"
                  >
                    <Form.Control
                      type="text"
                      placeholder="title"
                      onChange={handleChange}
                      value={form.title}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="author"
                    label="Author"
                  >
                    <Form.Control
                      type="text"
                      placeholder="author"
                      onChange={handleChange}
                      value={form.author}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="publication_date"
                    label="Publication Date"
                  >
                    <Form.Control
                      type="date"
                      placeholder="publication_date"
                      onChange={handleChange}
                      value={form.publication_date}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="pages"
                    label="Pages"
                  >
                    <Form.Control
                      type="number"
                      placeholder="pages"
                      onChange={handleChange}
                      value={form.pages}
                    />
                  </FloatingLabel>
                  <FloatingLabel className="mb-3" controlId="isbn" label="ISBN">
                    <Form.Control
                      type="number"
                      placeholder="isbn"
                      onChange={handleChange}
                      value={form.isbn}
                    />
                  </FloatingLabel>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h1 className="h3 fw-bold">{detailLiterature?.title}</h1>
                    <div className="text-muted" style={{ fontSize: 20 }}>
                      {detailLiterature?.author}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="fw-bold tag-title">Publication Date</div>
                    <div className="text-muted tag-data">
                      {detailLiterature?.author}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="fw-bold tag-title">Pages</div>
                    <div className="text-muted tag-data">
                      {detailLiterature?.pages}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="fw-bold tag-title">ISBN</div>
                    <div className="text-muted tag-data">
                      {detailLiterature?.isbn}
                    </div>
                  </div>

                  <div className="tag">
                    <button
                      className="btn btn-danger py-2"
                      onClick={handleDownload}
                    >
                      Download
                      <span className="ms-3">
                        <i className="fas fa-cloud-download-alt"></i>
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="col-auto">
              {state.user?.id === detailLiterature?.user.id ? (
                <div className="d-flex flex-column">
                  {editable ? (
                    <>
                      <button
                        className="btn btn-success mb-3"
                        onClick={handleUpdate}
                      >
                        Submit
                        <span>
                          <i className="fas fa-check ms-2"></i>
                        </span>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setEditable(false);
                        }}
                      >
                        Cancel
                        <span>
                          <i className="fas fa-ban ms-2"></i>
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning text-light mb-3"
                        onClick={() => {
                          setEditable(true);
                        }}
                      >
                        Edit Literature
                        <span>
                          <i className="fas fa-edit ms-2"></i>
                        </span>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Delete Literature
                        <span>
                          <i className="fas fa-trash ms-2"></i>
                        </span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {!collected ? (
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={handleCollect}
                      >
                        Add My Collection
                        <span>
                          <i className="far fa-bookmark ms-2"></i>
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCollect}
                      >
                        Remove Collection
                        <span>
                          <i className="fas fa-bookmark ms-2"></i>
                        </span>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <ModalConfirm
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        handleDelete={handleDelete}
      />
    </div>
  );
}
