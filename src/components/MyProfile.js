import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { InputFileAvatar } from "elements";
import { API } from "config/api";

export default function MyProfile({ state }) {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    email: state.user.email,
    gender: state.user.gender,
    phone: state.user.phone,
    address: state.user.address,
  });

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    try {
      setEditable(false);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      await API.put(`/users/${state.user.id}`, body, config);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="my-profile">
      <div className="container">
        <div className="profile">
          <h1 className="h3 fw-bold mb-4 ms-3">Profile</h1>
          <div className="card p-3 mx-auto">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="data d-flex flex-column">
                  <div className="d-flex mb-4 ">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: 40 }}
                    >
                      <i className="fas fa-envelope text-danger fs-1"></i>
                    </div>

                    {editable ? (
                      <div className="ms-3 w-100">
                        <FloatingLabel controlId="email" label="Email">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={form.email}
                            disabled
                          />
                        </FloatingLabel>
                      </div>
                    ) : (
                      <div className="ms-3">
                        <div className="fw-bold tag-name">
                          {state.user?.email}
                        </div>
                        <div className="text-muted tag-title">Email</div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex mb-4 ">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: 40 }}
                    >
                      <i className="fas fa-transgender text-danger fs-1"></i>
                    </div>
                    {editable ? (
                      <div className="ms-4 w-100">
                        <FloatingLabel
                          className="text-muted"
                          controlId="gender"
                          label="Gender"
                        >
                          <Form.Select
                            aria-label="gender"
                            value={form.gender}
                            onChange={handleChange}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Form.Select>
                        </FloatingLabel>
                      </div>
                    ) : (
                      <div className="ms-3">
                        <div className="fw-bold tag-name">
                          {state.user?.gender.charAt(0).toUpperCase() +
                            state.user?.gender.slice(1)}
                        </div>
                        <div className="text-muted tag-title">Gender</div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex mb-4">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: 40 }}
                    >
                      <i className="fas fa-phone-alt text-danger fs-1"></i>
                    </div>
                    {editable ? (
                      <div className="ms-3">
                        <FloatingLabel controlId="phone" label="Phone">
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            onChange={handleChange}
                            value={form.phone}
                          />
                        </FloatingLabel>
                      </div>
                    ) : (
                      <div className="ms-3">
                        <div className="fw-bold tag-name">
                          {state.user?.phone}
                        </div>
                        <div className="text-muted tag-title">Phone</div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex mb-4">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: 40 }}
                    >
                      <i className="fas fa-map-marker-alt text-danger fs-1"></i>
                    </div>
                    {editable ? (
                      <div className="ms-3">
                        <FloatingLabel controlId="address" label="Address">
                          <Form.Control
                            placeholder="Address"
                            onChange={handleChange}
                            value={form.address}
                          />
                        </FloatingLabel>
                      </div>
                    ) : (
                      <div className="ms-3">
                        <div className="fw-bold tag-name">
                          {state.user?.address}
                        </div>
                        <div className="text-muted tag-title">Address</div>
                      </div>
                    )}
                  </div>
                </div>

                {editable ? (
                  <div>
                    <div className="mb-2">
                      <button className="btn btn-success" onClick={handleEdit}>
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                    <div className="mb-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setEditable(false);
                        }}
                      >
                        <i className="fas fa-ban"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2">
                    <button
                      className="btn btn-warning text-light"
                      onClick={() => {
                        setEditable(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                )}

                <InputFileAvatar
                  userId={state.user?.id}
                  avatar={state.user?.avatar}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
