import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { StyledModal, StyledOverlay } from './styled';

const Modal = ({ onCloseModal, visibleData }) => {
  const [counter, setCounter] = useState(0);
  const [selectedDataType, setSelectedDataType] = useState('images'); // "images" | "videos" | "posts" | "audios"

  const handleIncrement = () => {
    setCounter(counter + 1);
    // setCounter(prevState => prevState + 1);
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => { // - componentWillUnmount
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]); // - componentDidMount

  useEffect(() => {
    console.log('Slect data type has changed');
  }, [selectedDataType]); // - componentDidMount + componentDidUpdate


  useEffect(() => {
    console.log('Counter has changed');
  }, [counter]); // - componentDidMount + componentDidUpdate


  // componentDidMount() {
  //   /*
  //   Спрацьовує після того, як відмалювалась розмітка компоненту.
  //         Коли його використовують:
  //         1. Коли нам потрібно ВСТАНОВИТИ глобальні слухачі подій addEventListener
  //         2. Коли нам потрібно зробити HTTP запит
  //         3. Коли дістати дані з localStorage
  //         4. Коли ми встановлємо таймери, або інтервали (setTimeout, setInterval)
  //   */

  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   /*
  //   Спрацьовує перед тим, як реакт повністю видалить компонент з розмітки(DOM).
  //    Коли його використовують:
  //         1. Коли нам потрібно ПРИБРАТИ глобальні слухачі подій removeEventListener
  //         2. Коли нам потрібно ВІДХИЛИТИ HTTP запит
  //         3. Коли ми ОЧИЩАЄМО таймери, або інтервали (clearTimeout, clearInterval)
  //   */
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <div>
          <h2>Current data type: {selectedDataType}</h2>
          <button onClick={() => setSelectedDataType('images')}>Images</button>
          <button onClick={() => setSelectedDataType('videos')}>Videos</button>
          <button onClick={() => setSelectedDataType('posts')}>Posts</button>
          <button onClick={() => setSelectedDataType('audios')}>Audios</button>
        </div>
        <div>
          <h3>Tabs content:</h3>
          {selectedDataType === 'images' && <p>Images tab content</p>}
          {selectedDataType === 'videos' && <p>Videos tab content 123</p>}
          {selectedDataType === 'posts' && <p>Posts tab content 12345</p>}
          {selectedDataType === 'audios' && <p>Audios tab content 1234567</p>}
        </div>
        <div>
          <h4>Counter: {counter}</h4>
          <button onClick={handleIncrement}>Click to increment counter</button>
        </div>
        <button onClick={onCloseModal}>&times;</button>
        <br />
        {JSON.stringify(visibleData, null, 2)}
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  visibleData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
