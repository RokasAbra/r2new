import { useState, useEffect } from "react";
import axios from "axios";
import BackContext from "./BackContext";
import Nav from "./Nav";
import { v4 as uuidv4 } from "uuid";
import Book from "./Books/Book";
import BooksInfo from "./AboutBooks/BooksInfo";




function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [messages, setMessages] = useState([]);
  //Categories
  const [createBook, setCreateBook] = useState(null);
  const [book, setBook] = useState(null);
    const [deleteteBook, setDeleteBook] = useState(null);
    const [editBook, setEditBook] = useState(null);
    const [modalBook, setModalBook] = useState(null);

  //Products
  //   const [products, setProducts] = useState(null);
  //   const [createProduct, setCreateProduct] = useState(null)
  //   const [deleteteProduct, setDeleteteProduct] = useState(null);
  //   const [editProduct, setEditProduct] = useState(null);
  //   const [modalProduct, setModalProduct] = useState(null);
  //   const [deletetePhoto, setDeletetePhoto] = useState(null);

  //Read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/book/")
      .then((res) => setBook(res.data));
  }, [lastUpdate]);

  //create
  useEffect(() => {
    if (null === createBook) return;
    axios
      .post("http://localhost:3003/admin/book/", createBook)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [createBook]);

  const showMessage = (m) => {
    const id = uuidv4();
    m.id = id;
    setMessages((msg) => [...msg, m]);
    setTimeout(() => {
      setMessages((mes) => mes.filter((ms) => ms.id !== id));
    }, 5000);
  };

  return (
    <BackContext.Provider
      value={{
        setCreateBook,
        book,
        messages,
        setDeleteBook,
        setEditBook,
        setModalBook,
        modalBook,
      }}
    >
      {show === "admin" ? (
        <>
          <Nav></Nav>
          <h1>Back</h1>
        </>
      ) : show === "book" ? (
        <Book/>
      ) : show === "books_info" ? (
        <BooksInfo/>
      ) : null}
    </BackContext.Provider>
  );

  //   if (show === "admin") {
  //     return (
  //       <>
  //         <Nav></Nav>
  //         <h1>Back</h1>
  //       </>
  //     );
  //   }

  //   if (show === "cats") {
  //     return (
  //       <>
  //         <CatsCrud></CatsCrud>
  //       </>
  //     );
  //   }

  //   if (show === "products") {
  //     return (
  //       <>
  //         <AboutBooks></AboutBooks>
  //       </>
  //     );
  //   }
}
export default Back;
