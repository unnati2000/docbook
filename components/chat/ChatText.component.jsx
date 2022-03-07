import { useState } from "react";

const ChatText = ({ sendMessage }) => {
  const [text, setText] = useState("");

  return (
    <form
      className="p-2 bg-gray-100"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(text);
        setText("");
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your chat..."
        className="w-full p-2 border-2 border-blue-500 bg-gray-100 rounded"
      />
    </form>
  );
};

export default ChatText;
