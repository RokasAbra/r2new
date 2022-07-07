
import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {
  const { modalBook, setModalBook, setEditBook } = useContext(BackContext);

  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (null === modalBook) {
      return;
    }
    setGenre(modalBook.genre);
  }, [modalBook]);

  const handleEdit = () => {
    const data = { genre, id: modalBook.id };
    setEditBook(data);
    setModalBook(null);
  }; 

  if (null === modalBook) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Categories</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalBook(null)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
              />
              <small className="form-text text-muted">
                Enter cat title here.
              </small>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setModalBook(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
