import { useContext, useEffect, useState } from "react";

import { AuthContext } from "contexts/AuthContext";
import { API } from "config/api";

import Header from "components/Header";
import NoData from "components/NoData";
import PdfLiterature from "elements/PdfLiterature";

export default function MyCollection() {
  const { state } = useContext(AuthContext);

  const [myCollections, setMyCollections] = useState([]);

  const getMyCollections = async () => {
    try {
      const response = await API.get(`/collections/${state.user?.id}`);

      setMyCollections(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyCollections();
  }, []);

  return (
    <div className="my-collection">
      <Header />

      <main className="pt-4">
        <div className="container">
          <h1 className="h3 fw-bold text-light mb-4">My Collection</h1>
          <div className="row">
            {myCollections.length ? (
              myCollections.map((item, index) => (
                <div className="col-3" key={`myCollections-${index}`}>
                  <PdfLiterature
                    attachment={item?.literature.attache}
                    literatureId={item?.literature.id}
                    title={item?.literature.title}
                    author={item?.literature.author}
                    publication_date={item?.literature.publication_date}
                  />
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
