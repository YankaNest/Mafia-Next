import React, { useState } from 'react';

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Открыть чат</button>
      {isOpen && (
        <div>
          <h2>Чат с поддержкой</h2>
          <button onClick={handleClose}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
