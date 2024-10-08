import React, { useState } from "react";
import { useSelector } from "react-redux";
import DisplayGroups from "../components/TermCard";

export const MyFlashCard = () => {
  const [threshold, setThreshold] = useState(3);
  const data = useSelector((state) => state.cardData); //get the data from redux store
  // toggle the cards styles based on user input
  const handleThreshold = () => {
    // console.log(threshold);
    setThreshold(threshold === data.length ? 3 : data.length);
  };

  return (
    <div className="p-4">
      <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center ">
        {/* loop the all entries of the data and pass it to child component for rendering */}
        {data.map((item, index) => (
          <div className="w-full sm:w-auto flex justify-center " key={index}>
            <DisplayGroups
              groupName={item.groupname}
              groupImg={item.groupImg}
              description={item.description}
              length={item.terms.length}
              index={index}
              threshold={threshold}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 relative w-full p-4">
        {/* button for see full card or less card => defaut screen less card */}
        <button
          className="absolute top-0 right-5 text-xl text-red-600 font-black"
          onClick={handleThreshold}
        >
          {/* toggle the text */}
          {threshold === data.length ? "See Few" : "See All"}
        </button>
      </div>
    </div>
  );
};
