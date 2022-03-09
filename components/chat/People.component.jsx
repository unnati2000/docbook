import moment from "moment";
import { useRouter } from "next/router";

const People = ({ chat }) => {
  const router = useRouter();

  return (
    <li
      className={chat?.messagesWith === router.query.chat ? "bg-gray-100" : ""}
    >
      <button className="flex overflow-x-hidden items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <img
          className="w-12 h-12 object-cover mr-3 rounded-full border"
          src={chat.profilePic}
          alt={chat.name}
        />
        <div className="transform translate-y-0.5 text-left">
          <h3 className="leading-4">{chat?.name}</h3>
          <div className="flex justify-between gap-2 mt-2">
            <span className="text-xs text-gray-500 truncate">
              {chat?.lastMessage}
            </span>
            <span className="text-xs text-gray-500">
              {moment(chat?.date).format("Mo MMM, h:mm A")}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};

export default People;
