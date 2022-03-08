import axios from "axios";
import cookie from "js-cookie";
import io from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import baseURL from "../utils/baseURL";
import People from "../components/chat/People.component";
import WindowHeader from "../components/chat/WindowHeader.component";
import ChatText from "../components/chat/ChatText.component";
import ChatWindow from "../components/chat/ChatWindow.component";
import ChatWindowIcon from "../components/chat/ChatWindowIcon.component";

const getChats = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/chats`, {
    headers: { Authorization: token },
  });
  return data;
};

const Chat = ({ user }) => {
  const name = "";

  const { data } = useQuery(["messages"], () => getChats(cookie.get("token")));

  const router = useRouter();
  const { chat } = router.query;

  if (chat === user._id) {
    router.push("/chat");
  }

  const scrollToBottom = (divRef) => {
    divRef.current && divRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  const [chats, setChats] = useState(data);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [banner, setBanner] = useState({ name: "", profilePic: "" });

  const socket = useRef();
  const openChatId = useRef("");
  const divRef = useRef();

  // Connecting to socket
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseURL);
    }
    if (socket.current) {
      socket.current.emit("join", { userId: user._id });
      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }
  }, []);

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: chat,
      });

      socket.current.on("messagesLoaded", ({ chat }) => {
        setMessages(chat.messages);
        setBanner({
          name: chat.messagesWith.name,
          profilePic: chat.messagesWith.profilePic,
        });
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });

      socket.current.on("noChatFound", async () => {
        const data = await getUserInfo(chat);
        if (data?.name && data?.profilePic) {
          const chatAlreadyExists = chats.find(
            (chatItem) => chatItem.messagesWith === chat
          );
          if (!chatAlreadyExists) {
            const newChat = {
              messagesWith: chat,
              name: data.name,
              profilePic: data.profilePic,
              lastMessage: "",
              date: Date.now(),
            };
            setChats((prevState) => [newChat, ...prevState]);
          }
          setBanner({ name: data.name, profilePic: data.profilePic });
          setMessages([]);
          openChatId.current = router.query.chat;
        }
      });
    };

    if (socket.current && router.query.chat) {
      loadMessages();
    }
  }, [router.query.chat]);

  const sendMessage = (message) => {
    if (socket.current) {
      socket.current.emit("newMessage", {
        userId: user._id,
        receiver: openChatId.current || router.query.chat,
        message,
      });
    }
  };

  // Receiving new messages from socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("messageSent", ({ newMessage }) => {
        if (newMessage.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.receiver
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            return [...prev];
          });
        }
      });

      socket.current.on("newMessageReceived", async ({ newMessage }) => {
        let senderName;

        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.sender
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const previouslyMessaged =
            chat.filter((chat) => chat.messagesWith === newMessage.sender)
              .length > 0;
          if (previouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const { name, profilePic } = await getUserInfo(newMessage.sender);
            senderName = name;
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profilePic,
              lastMessage: newMessage.message,
              date: newMessage.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }
        // messageNotification(senderName);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  return (
    <div className="bg-gray-50  sm:p-5 h-chat">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full border-r border-gray-300  sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user?.name}{" "}
            </button>
          </div>

          {/* <Search /> */}
          <ul className="py-1 overflow-auto">
            {chats?.length > 0 ? (
              chats.map((chat) => (
                <div
                  onClick={() =>
                    router.push(`/chat?chat=${chat.messagesWith}`, undefined, {
                      shallow: true,
                    })
                  }
                  key={chat._id}
                >
                  <People chat={chat} />
                </div>
              ))
            ) : (
              <div className="text-center">
                <h1 className="text-xl text-gray-500 my-4">
                  You don't have any chats yet.
                </h1>
              </div>
            )}
          </ul>
        </div>

        <div className="flex flex-col w-full">
          {banner?.name !== "" && banner.profilePic !== "" ? (
            <>
              <WindowHeader banner={banner} />
              <div className="flex-1 overflow-y-auto">
                <ChatWindow
                  divRef={divRef}
                  chats={messages}
                  userId={user?._id}
                />
              </div>
              <div className="w-full">
                <ChatText sendMessage={sendMessage} />
              </div>
            </>
          ) : (
            <div className="mx-auto text-center">
              <ChatWindowIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["messages"], () => getChats(token));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: "Your Messages on Driwwwle",
    },
  };
}

export default Chat;
