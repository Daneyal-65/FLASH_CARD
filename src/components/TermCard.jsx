import React from "react";
import { useNavigate } from "react-router-dom";
const DisplayGroups = ({
  groupImg,
  groupName,
  description,
  length = 1,
  index,
  threshold,
}) => {
  const navigate = useNavigate();
  const handleVeiwCard = (index) => {
    navigate(`/showdata/${index}`);
  };
  return (
    <>
      {index < threshold ? (
        <div className="shadow-md bg-gradient-to-tr bg-white to-gray border border-gray-100 rounded-lg h-[230px] w-[340px]">
          <ul className="flex flex-col items-center relative p-4 ">
            <li className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden -mt-10 border-2 border-white shadow-md">
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="Group"
                  className="object-cover w-full h-full"
                />
              ) : (
                ""
              )}
            </li>

            <li className="font-sans font-bold text-lg mt-1">
              {groupName.slice(0, 20)}
            </li>

            <li className="font-sans font-medium text-center text-gray-600 leading-none text-wrap">
              {description.substring(0, 20)}
            </li>

            <li className="mt-1 font-sans font-normal text-gray-600">
              {`${length} Card`}
            </li>

            <li className="w-full mt-4 flex justify-center items-center">
              <button
                className="w-[60%] h-10 p-1 text-center text-red-800 border-2 border-red-800 rounded-md bg-white hover:bg-red-800 hover:text-white transition-all"
                onClick={() => handleVeiwCard(index)}
              >
                View Cards
              </button>
            </li>
          </ul>
        </div>
      ) : index < 6 ? (
        <div className="shadow-md bg-gradient-to-tr bg-white to-gray border border-gray-100 rounded-lg h-[230px] w-[340px]">
          <div className="flex items-start p-2">
            {/* Image Container */}
            <div className="bg-gray-400 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden border-2 border-white shadow-md">
              {groupImg && (
                <img
                  src={groupImg}
                  alt="Group"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="ml-4">
              {/* Group Name */}
              <h2 className="font-sans font-bold text-lg leading-none break-words pt-4">
                {groupName.slice(0, 10)}
              </h2>
              {/* Cards Count */}
              <p className="font-sans font-normal text-gray-600">
                {length > 1 ? `${length} Cards` : `${length} Card`}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans font-medium text-gray-600 mt-4 min-h-[70px] pl-3">
            {description.slice(0, 100)}
          </p>

          {/* Button */}
          <div className="mt-4">
            <button
              className="text-red-600 font-bold flex items-center pl-3"
              onClick={() => handleVeiwCard(index)}
            >
              View Cards
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DisplayGroups;
