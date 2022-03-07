const ChatWindow = ({ chats, userId, divRef }) => {
  return (
    <div className="px-4">
      {chats.length > 0 &&
        chats.map((chat) => (
          <div className="flex flex-col" ref={divRef}>
            {userId === chat.sender ? (
              <div className="ml-auto w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg mb-2 inline-block bg-gray-100 text-gray-600 p-2 rounded my-1">
                <p>{chat?.message}</p>
              </div>
            ) : (
              <div className="mr-auto w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg mb-2 inline-block bg-blue-100 p-2 rounded text-blue-500 my-1">
                <p>{chat?.message}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatWindow;
