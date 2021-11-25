import { InputFileAvatar } from "elements";

export default function MyProfile({ state }) {
  return (
    <section className="my-profile">
      <div className="container">
        <h1 className="h3 fw-bold mb-4">Profile</h1>
        <div
          className="card p-3 mx-auto"
          style={{ backgroundColor: "#252525" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex mb-4 ">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: 40 }}
                  >
                    <i className="fas fa-envelope text-danger fs-1"></i>
                  </div>
                  <div className="ms-3">
                    <div className="fw-bold tag-name">
                      {state.user?.fullname}
                    </div>
                    <div className="text-muted tag-title">Email</div>
                  </div>
                </div>

                <div className="d-flex mb-4 ">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: 40 }}
                  >
                    <i className="fas fa-transgender text-danger fs-1"></i>
                  </div>
                  <div className="ms-3">
                    <div className="fw-bold tag-name">
                      {state.user?.gender.charAt(0).toUpperCase() +
                        state.user?.gender.slice(1)}
                    </div>
                    <div className="text-muted tag-title">Gender</div>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: 40 }}
                  >
                    <i className="fas fa-phone-alt text-danger fs-1"></i>
                  </div>
                  <div className="ms-3">
                    <div className="fw-bold tag-name">{state.user?.phone}</div>
                    <div className="text-muted tag-title">Phone</div>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: 40 }}
                  >
                    <i className="fas fa-map-marker-alt text-danger fs-1"></i>
                  </div>
                  <div className="ms-3">
                    <div className="fw-bold tag-name">
                      {state.user?.address}
                    </div>
                    <div className="text-muted tag-title">Address</div>
                  </div>
                </div>
              </div>

              <InputFileAvatar
                userId={state.user?.id}
                avatar={state.user?.avatar}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
