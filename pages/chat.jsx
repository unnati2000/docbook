import People from "../components/chat/People.component";
import WindowHeader from "../components/chat/WindowHeader.component";
import ChatText from "../components/chat/ChatText.component";
import ChatWindow from "../components/chat/ChatWindow.component";
import ChatWindowIcon from "../components/chat/ChatWindowIcon.component";

const Chat = () => {
  const name = "";

  return (
    <div className="bg-gray-50 w-screen h-screen sm:p-5">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              User
            </button>
          </div>

          {/* <Search /> */}
          <ul className="py-1 overflow-auto">
            <People />
          </ul>
        </div>

        <div className="flex align-middle relative flex-col sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center">
          {name === "" ? (
            <>
              <WindowHeader />
              <div className="my-2">
                <ChatWindow />;
              </div>
              <div className="content-end">
                <ChatText />
              </div>
            </>
          ) : (
            <div>
              <ChatWindowIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
