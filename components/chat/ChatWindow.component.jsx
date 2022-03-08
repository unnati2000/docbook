import moment from "moment";

const ChatWindow = ({ chats, userId, divRef }) => {
  return (
    <div className="px-4 bg-gray-50">
      {chats.length > 0 &&
        chats.map((chat) => (
          <div className="flex flex-col" ref={divRef}>
            {userId === chat.sender ? (
              <div className="flex flex-col justify-end ml-auto w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg">
                <div className=" mb-2 inline-block bg-blue-100 text-black p-2 rounded my-1">
                  <p>{chat?.message}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {moment(chat?.date).format("Mo MMM, hA")}
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-start mr-auto w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg">
                <div className="mb-2 inline-block bg-blue-300 p-2 rounded text-black my-1">
                  <p>{chat?.message}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {moment(chat?.date).format("Mo MMM, h:mm A")}
                </span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatWindow;
