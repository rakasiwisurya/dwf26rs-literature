import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { API } from "config/api";
import { AuthContext } from "contexts/AuthContext";

import Header from "components/Header";
import { NotificationManager } from "react-notifications";

export default function DetailLiterature() {
  const { id } = useParams();

  const { state } = useContext(AuthContext);

  const [detailLiterature, setDetailLiterature] = useState(null);
  const [detailCollection, setDetailCollection] = useState(null);
  const [collected, setCollected] = useState(false);

  const getDetailLiterature = async () => {
    try {
      const response = await API.get(`/literatures/${id}`);
      setDetailLiterature(response.data.data);

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
            response.data.status
          );

          setCollected(true);
          getDetailLiterature();
        }
      }
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
              {!collected ? (
                <>
                  <button className="btn btn-danger" onClick={handleCollect}>
                    Add My Collection
                    <span>
                      <i className="far fa-bookmark ms-2"></i>
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary" onClick={handleCollect}>
                    Remove Collection
                    <span>
                      <i className="fas fa-bookmark ms-2"></i>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
