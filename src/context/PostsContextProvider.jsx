import { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  return (
    <PostsContext.Provider
      value={{
        todayDate: new Date().getDay(),
        showNotificationMessage,
        setShowNotificationMessage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
