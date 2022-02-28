import { useState } from "react";

const ChatText = ({ sendMessage }) => {
  const [text, setText] = useState("");

  return (
    <form
      className="p-2 bg-gray-100"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Type your chat..."
        // value={text}
        // onChange={(e) => setText(e.target.value)}
        className="w-full align-baseline p-2 bg-gray-100 border border-blue-500 border-2 rounded"
      />
    </form>
  );
};

export default ChatText;
