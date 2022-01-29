import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";

const Review = () => {
  return (
    <>
      <h2 className="text-blue-500 font-semibold text-xl">Reviews</h2>
      <div className="flex my-4">
        <img
          src="https://imagesx.practo.com/providers/d02a7033-1123-49f1-a59d-19c3ba795dd1.jpg?i_type=t_100x100"
          className="h-12 w-12 rounded-full"
        />
        <div className="mx-2">
          <h1 className="text-blue-500 text-lg">name</h1>
          <p className="text-gray-500">nulla, animi veritatis consectetur</p>
          <p className="flex items-center">
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <AiFillStar className="h-4 w-4 text-yellow-500" />
            <FaStarHalf />
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
