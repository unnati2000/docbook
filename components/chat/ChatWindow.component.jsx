const ChatWindow = () => {
  const isUserSender = true;

  return (
    <div>
      {isUserSender ? (
        <div className="text-left bg-gray-100 text-gray-600 p-2 rounded my-1">
          <p>Hi</p>
        </div>
      ) : (
        <div className="text-right bg-blue-100 p-2 rounded text-blue-500 my-1">
          <p>Hi</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
