import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";

import { API } from "config/api";

import Header from "./Header";
import NoData from "./NoData";

export default function AdminHome() {
  const [literatures, setLiteratures] = useState([]);

  const getLiteratures = async () => {
    try {
      const response = await API.get("/literatures");

      setLiteratures(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (literatureId, status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ status });
      const response = await API.put(
        `/literatures/${literatureId}`,
        body,
        config
      );
      if (response.status === 200) {
        NotificationManager.success(
          response.data.message,
          response.data.status
        );
      }

      getLiteratures();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLiteratures();
  }, []);

  return (
    <div className="admin-home">
      <div className="container">
        <Header />

        <main className="pt-4">
          <h1
            className="h3 fw-bold mb-4"
            style={{ fontFamily: "avenir, sans-serif" }}
          >
            Book Verification
          </h1>

          {literatures.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>User or Author</th>
                  <th>ISBN</th>
                  <th>Literature</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {literatures.map((item, index) => (
                  <tr key={`data-${index}`}>
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item?.author}</td>
                    <td className="py-3">{item?.isbn}</td>
                    <td className="py-3">
                      <a
                        href={item?.attache.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-info text-decoration-none"
                      >
                        {item?.attache.filename}
                      </a>
                    </td>
                    <td className="py-3">
                      <div
                        className={`fw-bold ${
                          (item?.status === "Waiting Approve" &&
                            "text-smooth-warning") ||
                          (item?.status === "Approve" &&
                            "text-smooth-success") ||
                          (item?.status === "Cancel" && "text-smooth-danger")
                        }`}
                      >
                        {item?.status === "Waiting Approve"
                          ? "Waiting to be verified"
                          : item?.status}
                      </div>
                    </td>
                    <td className="py-3">
                      {item?.status === "Waiting Approve" && (
                        <div className="row gx-2">
                          <div className="col">
                            <button
                              className="btn btn-smooth-danger text-white w-100 fw-bold"
                              onClick={() => {
                                handleAction(item.id, "Cancel");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col">
                            <button
                              className="btn btn-smooth-success text-white w-100 fw-bold"
                              onClick={() => {
                                handleAction(item.id, "Approve");
                              }}
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      )}
                      {item?.status === "Approve" && (
                        <div className="text-center">
                          <i className="fas fa-check-circle text-success fs-2"></i>
                        </div>
                      )}
                      {item?.status === "Cancel" && (
                        <div className="text-center">
                          <i className="fas fa-times-circle text-danger fs-2"></i>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </main>
      </div>
    </div>
  );
}
