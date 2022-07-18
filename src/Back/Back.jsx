import { useState, useEffect } from "react";
import axios from "axios";
import BackContext from "./BackContext";
import Nav from "./Nav";
import { v4 as uuidv4 } from "uuid";
import Books from "./Books/Book";
import BooksInfo from "./AboutBooks/BooksInfo";

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [messages, setMessages] = useState([]);
  //Categories
  const [createBook, setCreateBook] = useState(null);
  const [books, setBooks] = useState(null);
  const [deleteteBook, setDeleteBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [modalBook, setModalBook] = useState(null);

  //Products
    const [aboutBooks, setAboutBooks] = useState(null);
    const [createAboutBooks, setCreateAboutbooks] = useState(null)
    const [deleteteAboutBooks, setDeleteteAboutBooks] = useState(null);
    const [editAboutBooks, setEditAboutBooks] = useState(null);
    const [modalAboutBooks, setModalAboutBooks] = useState(null);
    const [deletetePhoto, setDeletetePhoto] = useState(null);

  //Books
  //Read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/book/")
      .then((res) => setBooks(res.data));
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

  //Delete
  useEffect(() => {
    if (null === deleteteBook) return;
    axios
      .delete("http://localhost:3003/admin/book/" + deleteteBook.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteteBook]);

  //Edit
  useEffect(() => {
    if (null === editBook) return;
    axios
      .put("http://localhost:3003/admin/book/" + editBook.id, editBook)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [editBook]);

  //About Books

  //read
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/books_info/")
      .then((res) => setAboutBooks(res.data));
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createAboutBooks) return;
    axios
      .post("http://localhost:3003/admin/books_info/", createAboutBooks)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [createAboutBooks]);

  //Delete
  useEffect(() => {
    if (null === deleteteAboutBooks) return;
    axios
      .delete("http://localhost:3003/admin/books_info/" + deleteteAboutBooks.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteteAboutBooks]);
  //Edit
  useEffect(() => {
    if (null === editAboutBooks) return;
    axios
      .put("http://localhost:3003/admin/books_info/" + editAboutBooks.id, editAboutBooks)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      });
  }, [editAboutBooks]);

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
        books,
        messages,
        setDeleteBook,
        setEditBook,
        setModalBook,
        modalBook,
        setCreateAboutbooks,
        aboutBooks,
        showMessage,
        setDeleteteAboutBooks,
        setEditAboutBooks,
        setModalAboutBooks,
        modalAboutBooks,

      }}
    >
      {show === "admin" ? (
        <>
          <Nav></Nav>
          <h1>Back</h1>
        </>
      ) : show === "book" ? (
        <Books />
      ) : show === "books_info" ? (
        <BooksInfo />
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
