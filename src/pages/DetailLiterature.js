import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    getDetailLiterature();
    getDetailCollection();
  }, []);

  const getDetailCollection = async () => {
    try {
      const response = await API.get(`/collections/literature/${id}`);
      setDetailCollection(response.data.data);
    } catch (error) {
      if (error.response) {
        setDetailCollection(null);
      }
    }
  };

  const getDetailLiterature = async () => {
    try {
      const response = await API.get(`/literatures/${id}`);
      setDetailLiterature(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollect = async () => {
    try {
      if (detailCollection) {
        const response = await API.delete(
          `/collections/${detailCollection.id}`
        );

        if (response.status === 200) {
          NotificationManager.success(
            response.data.message,
            response.data.status,
            4000,
            () => {
              history.push("/collection");
            }
          );

          getDetailCollection();
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

          getDetailCollection();
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
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open(detailLiterature?.attache);
              }}
            >
              <Document file={detailLiterature?.attache}>
                <Page
                  pageNumber={1}
                  width={295}
                  height={400}
                  className="rounded"
                />
              </Document>
            </div>
            <div className="col ps-5">
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
            </div>
            <div className="col-auto">
              {state.user?.id === detailLiterature?.user.id ? (
                <>
                  <div className="mb-3">
                    <button className="btn btn-secondary" disabled>
                      You are the owner
                      <span>
                        <i class="fas fa-user-tag  ms-2"></i>
                      </span>
                    </button>
                  </div>

                  {detailLiterature?.status === "Cancel" && (
                    <div className="mb-3">
                      <button className="btn btn-danger w-100">
                        Delete Literature
                        <span>
                          <i class="fas fa-trash ms-2"></i>
                        </span>
                      </button>
                    </div>
                  )}

                  <div
                    className={`notif fw-bold
                      ${
                        detailLiterature?.status === "Waiting Approve" &&
                        "notif-warning"
                      }
                      ${
                        detailLiterature?.status === "Approve" &&
                        "notif-success"
                      }
                      ${detailLiterature?.status === "Cancel" && "notif-danger"}
                      `}
                  >
                    {detailLiterature?.status}
                  </div>
                </>
              ) : (
                <>
                  {!detailCollection ? (
                    <button className="btn btn-danger" onClick={handleCollect}>
                      Add My Collection
                      <span>
                        <i className="far fa-bookmark ms-2"></i>
                      </span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={handleCollect}
                    >
                      Remove Collection
                      <span>
                        <i className="fas fa-bookmark ms-2"></i>
                      </span>
                    </button>
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
