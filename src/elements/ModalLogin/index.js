import { useState } from "react";
import { useHistory } from "react-router";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";
import { NotificationManager } from "react-notifications";

import { API, setAuthToken } from "config/api";

import "./index.scss";

export default function ModalLogin(props) {
  const { show, handleClose, handleSwitch, dispatch } = props;
  const history = useHistory();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      setAuthToken(response?.data.data.token);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        NotificationManager.success(
          response.data.message,
          response.data.status
        );
        handleClose();
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error?.response.data?.message) {
        return NotificationManager.error(
          error.response.data.message,
          error.response.data.status
        );
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Title
        className="px-4 pt-4 fw-bold fs-1"
        style={{ fontFamily: "Avenir, sans-serif" }}
      >
        Sign In
      </Modal.Title>
      <Modal.Body className="p-4">
        <Form onSubmit={handleLogin}>
          <FloatingLabel className="mb-3" controlId="email" label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-4" controlId="password" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
          </FloatingLabel>
          <Button variant="danger" type="submit" className="w-100 mb-2">
            Sign In
          </Button>
          <div className="w-100 text-center">
            Already have an account ?{" "}
            <span
              className="text-danger text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={handleSwitch}
            >
              Click here
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
