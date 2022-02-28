const People = () => {
  return (
    <li>
      <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <img
          className="w-12 h-12 object-cover mr-3 rounded-full border"
          src={
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
          alt="Junior Coders"
        />
        <div className="transform translate-y-0.5 text-left">
          <h3 className="leading-4">Name</h3>
          <span className="text-xs text-gray-500">Active 20s ago</span>
        </div>
      </button>
    </li>
  );
};

export default People;
