import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";

const RatingStar = ({ rating }) => {
  return (
    <p className="flex items-center">
      {rating === 1 ? (
        <AiFillStar className="h-4 w-4 text-yellow-500" />
      ) : rating > 1 && rating < 2 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <FaStarHalf className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating === 2 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating > 2 && rating < 3 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <FaStarHalf className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating === 3 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating > 3 && rating < 4 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <FaStarHalf className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating === 4 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating > 4 && rating < 5 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <FaStarHalf className="h-4 w-4 text-yellow-500" />
        </>
      ) : rating === 5 ? (
        <>
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
          <AiFillStar className="h-4 w-4 text-yellow-500" />
        </>
      ) : (
        <></>
      )}
    </p>
  );
};

export default RatingStar;
