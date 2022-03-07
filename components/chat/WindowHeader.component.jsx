const WindowHeader = ({ banner }) => {
  return (
    <div className="flex text-left items-center p-4">
      <img
        src={banner.profilePic}
        className="h-10 object-cover mr-2 w-10 rounded-full"
      />
      <h2 className="text-gray-500 text-xl font-normal"> {banner.name}</h2>
    </div>
  );
};

export default WindowHeader;
