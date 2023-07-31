import React, { useContext, useEffect, useRef, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

// import BookForm from './BookForm/BookForm';
// import BookList from './BookList/BookList';
import Modal from './Modal/Modal';

// import booksData from '../books.json';
import { fetchPostDetails, fetchPosts } from 'services/api';
import BookList from './BookList/BookList';
import { BookContext } from 'context/BooksContext';

// const books = booksData.books;

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const App = () => {
  // const [modal, setModal] = useState({ isOpen: false, visibleData: null });
  const [posts, setPosts] = useState(
    () => JSON.parse(localStorage.getItem('posts')) ?? []
  );
  const [books, setBooks] = useState(
    () => JSON.parse(localStorage.getItem('books')) ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  // const firtRenderRef = useRef(true);
  const { modal, onCloseModal } = useContext(BookContext);

  const onRemoveBook = () => {};

  // const onOpenModal = data => {
  //   setModal({
  //     isOpen: true,
  //     visibleData: data,
  //   });
  // };

  // const onCloseModal = () => {
  //   setModal({
  //     isOpen: false,
  //     visibleData: null,
  //   });
  // };

  // const onSelectPostId = postId => {
  //   setSelectedPostId(postId);
  // };

  // useEffect(() => {
  //   const fetchPostsData = async () => {
  //     try {
  //       setIsLoading(true);

  //       const posts = await fetchPosts();

  //       setPosts(posts);
  //       toast.success('Your posts were successfully fetched!', toastConfig);
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(error.message, toastConfig);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPostsData();
  // }, []);

  // useEffect(() => {
  //   // Варіант відхилення виконаннь юзЕффект при першому рендері
  //   // if (firtRenderRef.current) return () => firtRenderRef.current = false;
  //   if (!selectedPostId) return;

  //   const fetchPostData = async postId => {
  //     try {
  //       setIsLoading(true);

  //       const postDetails = await fetchPostDetails(postId);

  //       onOpenModal(postDetails);
  //       toast.success('Post details were successfully fetched!', toastConfig);
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(error.message, toastConfig);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPostData(selectedPostId);
  // }, [selectedPostId]);


  return (
    <div>
      <h1>Мій олюблений Реакт😂</h1>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && (
        <MutatingDots
          height="100"
          width="100"
          color="#5800a5"
          secondaryColor="#e08e00"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
      />
      {/* {posts.length > 0 &&
        posts.map(post => {
          return (
            <button
              className="post"
              onClick={() => onSelectPostId(post.id)}
              type="button"
              key={post.id}
            >
              <strong>Id: {post.id}</strong>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </button>
          );
        })} */}
      {modal.isOpen && (
        <Modal onCloseModal={onCloseModal} visibleData={modal.visibleData} />
      )}
    </div>
  );
};
