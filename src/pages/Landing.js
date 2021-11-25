import Books from "assets/images/books.svg";
import Header from "components/Header";

export default function Landing() {
  return (
    <>
      <Header />

      <main className="landing">
        <div className="container">
          <div className="row">
            <div
              className="col-auto d-flex flex-column align-items-start justify-content-center"
              style={{ width: 480 }}
            >
              <h1 className="fw-bold" style={{ fontSize: 96 }}>
                source <span className="fst-italic">of</span> intellegence
              </h1>

              <p style={{ fontSize: 24 }}>
                Sign-up and receive unlimited accesss to all of your literatur -
                share your literature.
              </p>

              <div className="w-100 row g-2">
                <div className="col">
                  <button className="btn btn-danger w-100">Sign Up</button>
                </div>
                <div className="col">
                  <button className="btn btn-light text-dark w-100">
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className="col d-flex justify-content-end">
              <img src={Books} alt="Books" width="600" height="600" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
