import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import { Link } from "react-router-dom";

const BookDetail = () => {
  const params = useParams();
  const [myBook, setMyBook] = useState(null);
  const [bookCategory, setBookCategory] = useState(null);
  useEffect(() => {
    /* http://localhost:3004/books/2 */
    api
      .get(`${urls.books}/${params.bookId}`)
      .then((resBook) => {
        console.log(resBook.data);
        setMyBook(resBook.data);
        api
          .get(`${urls.categories}/${resBook.data.categoryId}`)
          .then((resCategory) => {
            console.log(resCategory.data);
            setBookCategory(resCategory.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);
  if (myBook === null || bookCategory === null) return null;
  return (
    <div>
      <>
        <Header />
        <div className="container my-5">
          <h3>Kitap Adı: {myBook.name}</h3>
          <h3>Yazarı: {myBook.author}</h3>
          <h3>Fiyatı: {myBook.price} &#8378;</h3>
          <h3>Yayıjn Evi: {myBook.publisher}</h3>
          <h3>ISBN: {myBook.isbn}</h3>
          <h3>Türü: {bookCategory.name}</h3>
          <Link to={"/"}>Geri</Link>
        </div>
      </>
    </div>
  );
};

export default BookDetail;
