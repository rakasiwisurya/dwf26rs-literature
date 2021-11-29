import { useEffect, useState } from "react";
import NoData from "./NoData";
import PdfLiterature from "elements/PdfLiterature";
import { API } from "config/api";

export default function MyLiterature({ state }) {
  const [myLiterature, setMyLiterature] = useState([]);

  const getMyLiterature = async () => {
    try {
      const response = await API.get(`/profile/${state.user?.id}/literatures`);
      setMyLiterature(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyLiterature();
  }, []);

  return (
    <section className="my-literature mt-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-4">My Literature</h1>
        <div className="row">
          {myLiterature.length ? (
            myLiterature.map((item, index) => (
              <div
                className="col-3 d-flex justify-content-center"
                key={`literature-${index}`}
              >
                <PdfLiterature
                  attachment={item.attache}
                  literatureId={item.id}
                  title={item.title}
                  author={item.author}
                  publication_date={item.publication_date}
                />
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </section>
  );
}
