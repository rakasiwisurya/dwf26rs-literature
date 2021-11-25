import { useState } from "react";
import Header from "components/Header";

import { API } from "config/api";

import Literature from "assets/images/literature-large.svg";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await API.get(`literature?title=${search}`);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <Header />

      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <img src={Literature} alt="Literature Logo" />
          <div className="mt-5" style={{ width: 600 }}>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2 w-100"
                type="search"
                placeholder="Search for literature"
                aria-label="Search"
                onChange={handleChange}
                value={search}
              />
              <button className="btn btn-danger" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
