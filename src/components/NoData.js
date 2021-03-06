import NotFoundIcon from "assets/images/not-found.svg";

export default function NoData() {
  return (
    <div className="no-data">
      <div className="container">
        <div className="text-center">
          <img src={NotFoundIcon} alt="Not Found" width="250" height="250" />
          <div className="fw-bold fs-3 mb-3">No Data Found</div>
        </div>
      </div>
    </div>
  );
}
