// import { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";
// import getBase64 from "../../Functions/getBase64";

function Edit() {
  const { modalAboutBooks, setModalAboutBooks, setEditAboutBooks, books, setDeletetePhoto } =
    useContext(BackContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [book, setBook] = useState("0");
  const [lu, setLu] = useState("");

//   const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);

  const setDateFormat = (d) => {
    //yyy-MM-dd-Thh:mm::ss
    const date = new Date(Date.parse(d));
    const year = date.getFullYear();
    const month = ("" + (date.getMonth() + 1)).padStart(2, "0");
    const day = ("" + date.getDate()).padStart(2, "0");
    const hours = ("" + date.getHours()).padStart(2, "0");
    const min = ("" + date.getMinutes()).padStart(2, "0");
    const sec = ("" + date.getSeconds()).padStart(2, "0");
    const out =
      year + "-" + month + "-" + day + "T" + hours + ":" + min + ":" + sec;

    // console.log(out);
    return out;
  };
  useEffect(() => {
    if (null === modalAboutBooks) {
      return;
    }
    // console.log(modalAboutBooks);
    setTitle(modalAboutBooks.title);
    setPrice(modalAboutBooks.price);
    setInStock(modalAboutBooks.in_stock ? true : false);
    // setBook(book.filter((c) => c.title === modalAboutBooks.book)[0].id);
    setLu(setDateFormat(modalAboutBooks.lu));
    setPhotoPrint(modalAboutBooks.photo);
  }, [modalAboutBooks, books]);

  const handleEdit = () => {
    const data = {
      title,
      id: modalAboutBooks.id,
      in_stock: inStock ? "1" : "0",
      price: parseFloat(price),
      book: parseInt(book),
      lu: lu,
      photo: photoPrint,
    };
    setEditAboutBooks(data);
    setModalAboutBooks(null);
  };

  if (null === modalAboutBooks) {
    return null;
  }
//   const doPhoto = () => {
//     getBase64(fileInput.current.files[0])
//       .then((photo) => setPhotoPrint(photo))
//       .catch((_) => {
//         // tylim
//       });
//   };
  const handleDeletePhoto = () => {
    setDeletetePhoto({id: modalAboutBooks.id});
    setModalAboutBooks(p => ({...p, photo: null}));
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Categories</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalAboutBooks(null)}
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <small className="form-text text-muted">
                Enter cat title here.
              </small>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <small className="form-text text-muted">Enter Price here.</small>
            </div>
            <label>Date</label>
            <input
              type="datetime-local"
              className="form-control"
              // required pattern="\d{4}-\d{2}-\d{2}"
              onChange={(e) => setLu(e.target.value)}
              value={lu}
            />
            <small className="form-text text-muted">Enter Date here.</small>
            <div className="form-group form-check">
              <input
                type="checkbox"
                // className="form-check-input"
                id="in--stock--modal"
                checked={inStock}
                onChange={() => setInStock((i) => !i)}
              />

              <label className="form-check-label" htmlFor="in--stock--modal">
                In Stock?
              </label>
            </div>
        
            <div className="form-group">
              <label>Categories</label>
              <select
                className="form-control"
                onChange={(e) => setBook(e.target.value)}
                value={book}
              >
                <option value="0">Please, select your category</option>

                {books
                  ? books.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.title}
                      </option>
                    ))
                  : null}
              </select>
              <small className="form-text text-muted">Select Category.</small>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setModalAboutBooks(null)}
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
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDeletePhoto}
            >
              Remove Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
