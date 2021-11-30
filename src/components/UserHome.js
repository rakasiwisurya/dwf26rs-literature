import { useState } from "react";

import { API } from "config/api";

import Literature from "assets/images/literature-large.svg";
import PdfLiterature from "elements/PdfLiterature";
import NoData from "./NoData";

export default function UserHome() {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const handleChangeYears = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const publication_year = (data) => {
    const pub_years = data.map((item) => {
      return item.publication_date.split("-")[0];
    });

    const uniqueYears = pub_years
      .filter((value, index) => {
        return pub_years.indexOf(value) === index;
      })
      .sort((a, b) => {
        return b - a;
      });

    setYears(uniqueYears);
    setSelectedYear(uniqueYears[uniqueYears.length - 1]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await API.get(`literature?title=${search}`);

      setResultSearch(response.data.data);
      publication_year(response.data.data);
      setIsSearch(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-home">
      {isSearch ? (
        <main className="py-4">
          <div className="container">
            <div className="research mb-5" style={{ width: 600 }}>
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
            <div className="result-search">
              <div className="row">
                {resultSearch.length ? (
                  <div className="col-2">
                    <div className="text-danger ms-3 mb-2">Anytime</div>
                    <select
                      className="form-select"
                      name="year"
                      id="year"
                      value={selectedYear}
                      onChange={handleChangeYears}
                    >
                      {years.map((item, index) => (
                        <option value={item} key={`year-${index}`}>
                          Since {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="col">
                  <div className="row g-3">
                    {resultSearch.length ? (
                      resultSearch
                        .filter(
                          (item) =>
                            item?.status === "Approve" &&
                            item?.publication_date.split("-")[0] >= selectedYear
                        )
                        .map((item, index) => (
                          <div className="col-3" key={`result-search-${index}`}>
                            <PdfLiterature
                              attachment={item?.attache}
                              literatureId={item?.id}
                              title={item?.title}
                              author={item?.author}
                              publication_date={item?.publication_date}
                            />
                          </div>
                        ))
                    ) : (
                      <div className="col">
                        <NoData />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
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
      )}
    </div>
  );
}
