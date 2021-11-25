import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { NotificationManager } from "react-notifications";

import { API, setAuthToken } from "config/api";

import "./index.scss";

export default function ModalRegister(props) {
  const { show, handleClose, handleSwitch, dispatch } = props;

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "male",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        email: form.email,
        password: form.password,
      });

      const response = await API.post("/login", body, config);

      setAuthToken(response?.data.data.token);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);      
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response?.status === 200) {
        NotificationManager.success(
          response.data.message,
          response.data.status
        );
      }

      handleLogin()
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
        Sign Up
      </Modal.Title>
      <Modal.Body className="p-4">
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Control
              type="text"
              placeholder="Fullname"
              onChange={handleChange}
              value={form.fullname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <Form.Select
              aria-label="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              type="text"
              placeholder="Phone"
              onChange={handleChange}
              value={form.phone}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              as="textarea"
              placeholder="Address"
              onChange={handleChange}
              value={form.address}
            />
          </Form.Group>
          <Button variant="danger" type="submit" className="w-100 mb-2">
            Sign Up
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
