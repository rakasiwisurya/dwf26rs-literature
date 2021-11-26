import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { API } from "config/api";

import Header from "components/Header";

export default function DetailLiterature() {
  const { id } = useParams();

  const [detailLiterature, setDetailLiterature] = useState(null);
  const [myCollections, setMyCollections] = useState([]);

  console.log(detailLiterature);

  const getDetailLiterature = async () => {
    try {
      const response = await API.get(`/literatures/${id}`);
      setDetailLiterature(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailLiterature();
  }, []);

  const handleDownload = () => {
    window.open(detailLiterature.attache);
  };

  return (
    <div className="detail-literature">
      <Header />

      <main className="pt-4">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <iframe
                src={detailLiterature?.attache}
                title={detailLiterature?.title}
                height="400"
                width="295"
              />
            </div>
            <div className="col ps-5">
              <div className="tag mb-4">
                <h1 className="h3 fw-bold">{detailLiterature?.title}</h1>
                <div className="text-muted" style={{ fontSize: 20 }}>
                  {detailLiterature?.author}
                </div>
              </div>

              <div className="tag mb-4">
                <div className="fw-bold" style={{ fontSize: 20 }}>
                  Publication Date
                </div>
                <div className="text-muted" style={{ fontSize: 16 }}>
                  {detailLiterature?.author}
                </div>
              </div>

              <div className="tag mb-4">
                <div className="fw-bold" style={{ fontSize: 20 }}>
                  Pages
                </div>
                <div className="text-muted" style={{ fontSize: 16 }}>
                  {detailLiterature?.pages}
                </div>
              </div>

              <div className="tag mb-4">
                <div className="fw-bold" style={{ fontSize: 20 }}>
                  ISBN
                </div>
                <div className="text-muted" style={{ fontSize: 16 }}>
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
              <button className="btn btn-danger">
                Add My Collection
                <span>
                  <i className="far fa-bookmark ms-2"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
