import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assests/styles/buttonStyle.css";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

import CustomModal from "./CustomModal";

const ListBooks = () => {
  const dispatch = useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [willDeleteBook, setWillDeleteBook] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(booksState.books);

  useEffect(() => {
    const temp = booksState.books.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) === true  ||
        item.author.toLowerCase().includes(searchText.toLowerCase()) === true
    );
    setFilteredBooks(temp);
  }, [searchText,booksState.books]);
  console.log(searchText);

  const deleteBook = (id) => {
    dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_FAIL,
          payload: "Kİtap silerken hata oluştu",
        });
      });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <input
          className="form-control w-75"
          type="text"
          placeholder="Kitap ismi girin"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {
          categoriesState.categories.lenght===0?(<Link to={"/add-category"}>Öncelikle kategori eklenmeli</Link>):(        <Link to={"/add-book"} className="btn btn-primary">
          Kitap ekle
        </Link>)
        }
      </div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Sıra No</th>
            <th scope="col">Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => {
            // let myCategory=null
            // for(let i=0;i<categoriesState.categories.length;i++){
            //   if(categoriesState.categories[i].id===book.categoryId){
            //     myCategory=categoriesState.categories[i]
            //   }
            // }
            const myCategory = categoriesState.categories.find(
              (item) => item.id === book.categoryId
            );
            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setWillDeleteBook(book.id);
                    }}
                    className="generalBtn deleteBtn"
                  >
                    Sil
                  </button>
                  <Link
                    to={`/edit-book/${book.id}`}
                    className="generalBtn editBtn"
                  >
                    Güncelle
                  </Link>
                  <Link to={`/book-detail/${book.id}`} className="generalBtn">
                    Detay
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <CustomModal
          title="Silme"
          message="Silmek istediğinize emin misiniz?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteBook(willDeleteBook);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ListBooks;
