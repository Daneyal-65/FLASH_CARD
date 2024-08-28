import React from "react";
import { FaBolt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex  items-start flex-col mb-8 p-2 ">
      <div
        className="flex justify-between items-center w-full 
        py-3 px-4 bg-gradient-to-t bg-gray-300 shadow-2xl
    to-white "
      >
        <div className="flex flex-1  items-center">
          <span>
            <FaBolt size={30} color="red" />
          </span>
          <span className="font-black text-xl text-red-950">
            Flash <strong className="text-red-600">~G</strong>
          </span>
        </div>
        <button
          className="bg-white text-red-700 w-16 md:w-24 h-8 md:h-10 text-center
         rounded-md hover:bg-red-600 transition-all hover:text-white hover:text-xl "
        >
          Login
        </button>
      </div>

      <div className="w-full px-8">
        <h1 className="font-black text-black font-sans m-2 p-1">
          CREATE FLASH CARD
        </h1>
        <div className="border-2 border-red-800 w-[100%]"></div>
        <ul
          className="flex gap-1 ml-2 list-none mb-3
      "
        >
          <li>
            {" "}
            <NavLink
              to="/CreateFlashCard"
              className={({ isActive }) =>
                isActive ? "navigationBtn active" : "navigationBtn"
              }
            >
              CreateCard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/MyFlashCard"
              className={({ isActive }) =>
                isActive ? "navigationBtn active" : "navigationBtn"
              }
            >
              MyflashCard
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
