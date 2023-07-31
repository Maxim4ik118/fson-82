import React, { useEffect, useState } from 'react';

import BookForm from './BookForm/BookForm';
import BookList from './BookList/BookList';
import Modal from './Modal/Modal';

import booksData from '../books.json';

const booksInitalData = booksData.books;

export const App = () => {
  // state = {
  //   books: books,
  //   modal: { isOpen: false, visibleData: null },
  // };
  const [books, setBooks] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, visibleData: null });

  const onRemoveBook = bookId => {
    // this.setState({
    //   books: this.state.books.filter(book => book.id !== bookId), // [{ id: 1 }, { id: 3 }]
    // });
    setBooks(books.filter(book => book.id !== bookId));
  };

  const onAddBook = bookData => {
    const finalBook = {
      ...bookData,
      id: (Math.random() * 10).toString(),
    };

    // this.setState({
    //   books: [finalBook, ...this.state.books],
    // });
    setBooks([finalBook, ...books]);
  };

  const onOpenModal = data => {
    // this.setState({
    //   modal: {
    //     isOpen: true,
    //     visibleData: data,
    //   },
    // });
    setModal({
      isOpen: true,
      visibleData: data,
    });
  };

  const onCloseModal = () => {
    // this.setState({
    //   modal: {
    //     isOpen: false,
    //     visibleData: null,
    //   },
    // });
    setModal({
      isOpen: false,
      visibleData: null,
    });
  };

  // componentDidMount() {
  //   const stringifiedBooks = localStorage.getItem('books');
  //   const books = JSON.parse(stringifiedBooks) ?? [];

  //   this.setState({ books });
  // }

  useEffect(() => {
    const stringifiedBooks = localStorage.getItem('books');
    const parsedBooks = JSON.parse(stringifiedBooks) ?? [];

    setBooks(parsedBooks);
  }, []);

  useEffect(() => {
    if (books === null) return;

    console.log('Books has changed');
    const stringifiedBooks = JSON.stringify(books);
    localStorage.setItem('books', stringifiedBooks);
  }, [books]);
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.modal.isOpen !== this.state.modal.isOpen) {
  //     console.log('МИ ВІДКРИЛИ АБО ЗАКРИЛИ МОДАЛКУ');
  //   }
  // if (prevState.books !== this.state.books) {
  //   const stringifiedBooks = JSON.stringify(this.state.books);
  //   localStorage.setItem('books', stringifiedBooks);
  // }
  // }

  return (
    <div>
      {modal.isOpen && (
        <Modal onCloseModal={onCloseModal} visibleData={modal.visibleData} />
      )}
      <BookForm title="BookForm" onAddBook={onAddBook} />
      <BookList
        onOpenModal={onOpenModal}
        onRemoveBook={onRemoveBook}
        books={books}
      />
    </div>
  );
};
