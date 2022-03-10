import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";

const RatingStar = ({ rating }) => {
  return (
    <p className="flex items-center">
      {/* display star according to rating

        if rating is less than 1.5, display 1 star
        if rating is between 1.5 and 2.5, display 1.5 star
        if rating is between 2.5 and 3.5, display 2 star
        if rating is between 3.5 and 4.5, display 2.5 star
        if rating is between 4.5 and 5, display 3 star
        if rating is 5, display 5 star

        */}
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
