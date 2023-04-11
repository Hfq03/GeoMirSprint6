import React from "react";
import { Link } from "react-router-dom";

export const PlaceMark = ({ placeMark, handleDelete }) => {
  return (
    <div className="flex mb-4 items-center">
      <div className="w-full text-grey-darkest">
        <span> {placeMark.description}</span>
      </div>
      <div className="w-full ml-20 text-grey-darkest items-center ">
        <span content-center >
          <Link className="underline self-center text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4" to={placeMark.route}>{placeMark.name}</Link>
        </span>
      </div>

      <button
        onClick={() => handleDelete(placeMark.id)}
        className="flex-no-shrink  p-2 ml-2 border-2 rounded  border-red-600  hover:text-white text-red-400 hover:bg-red-500"
      >
        Remove
      </button>
    </div>
  );
};
