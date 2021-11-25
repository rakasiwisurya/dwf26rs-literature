import { API } from "config/api";
import "./index.scss";

export default function InputFileAvatar({ userId, avatar }) {
  const handleChange = async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("avatar", e.target.files[0], e.target.files[0].name);

      await API.put(`/users/${userId}`, formData, config);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-file-avatar" style={{ width: 230 }}>
      <div className="preview-image">
        <img
          src={avatar}
          alt="User"
          width="230"
          height="230"
          className="rounded"
        />
      </div>
      <input
        type="file"
        hidden
        id="avatar"
        aria-label="file upload"
        name="avatar"
        onChange={handleChange}
      />
      <label htmlFor="avatar" className="btn btn-danger w-100 mt-3">
        Change Photo Profile
      </label>
    </div>
  );
}
