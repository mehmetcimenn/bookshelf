import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import Error from "./pages/Error";
import EditBook from "./pages/EditBook";
import ListCategories from "./pages/ListCategories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
  const dispatch = useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);
  useEffect(() => {
    /* fetch books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        console.log(res.data); // Gelen verileri kontrol etmek için
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        // Hata durumunda yapılacak işlemler
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
    /* fetch categories */

    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Hata oluştu",
        });
      });
  }, []);

  if (booksState.success === false || categoriesState.success === false)
  return null;
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-detail/:bookId" element={<BookDetail />}/>  
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<Error />} />
          <Route path="/edit-book/:bookId" element={<EditBook />}/>
          <Route path="/list-categories" element={<ListCategories />} />
          <Route path="add-category"element={<AddCategory />}/>
          <Route path="edit-category/:categoryId" element={<EditCategory />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
