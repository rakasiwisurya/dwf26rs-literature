import "./index.scss";

export default function InputFileLiterature({ onChange }) {
  return (
    <div className="input-file-literature">
      <input
        type="file"
        hidden
        id="attache"
        aria-label="file upload"
        name="attache"
        onChange={onChange}
      />
      <label htmlFor="attache" className="btn btn-gray">
        Attache Book File
        <i className="fas fa-paperclip ms-4"></i>
      </label>
    </div>
  );
}
