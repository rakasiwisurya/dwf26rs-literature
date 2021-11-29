import NotFoundIcon from "assets/images/not-found.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img src={NotFoundIcon} alt="Not Found" width="250" height="250" />
        <div className="fw-bold fs-3 mb-3">Page Not Found</div>
        <Link to="/home" type="button" className="btn btn-danger mt-2 fw-bold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
