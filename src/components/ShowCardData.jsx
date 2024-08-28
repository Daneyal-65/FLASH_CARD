import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaCopy,
  FaFacebook,
  FaFileDownload,
  FaLinkedin,
  FaPrint,
  FaShare,
  FaTwitter,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useGeneratePdf from "../hooks/useGeneratePdf";

const ShowCardData = () => {
  const generatePdf = useGeneratePdf();
  const navigate = useNavigate();
  const { index } = useParams();
  const cardData = useSelector((state) => state.cardData[index]);
  const Data = useSelector((state) => state.cardData);
  console.log(JSON.parse(localStorage.getItem("data")));
  const [showData, setAndShowData] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCopy, setCopy] = useState(false);
  const { groupname, terms } = { ...cardData };
  // console.log(terms);

  // Function to handle carousel navigation
  const handlePrev = () => {
    setAndShowData((prev) => (prev === 0 ? terms.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAndShowData((prev) => (prev === terms.length - 1 ? 0 : prev + 1));
  };
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      // console.log("test");
      setCopy(true);
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleGeneratePdf = () => {
    generatePdf(Data);
  };
  return (
    <div className="p-4 bg-gray-50 min-h-screen flex items-center flex-col">
      {/* Header */}
      <div className="flex mb-6 ml-4 items-center w-full justify-start">
        <button className="text-gray-600 text-2xl" onClick={() => navigate(-1)}>
          <FaArrowLeft fontSize={24} />
        </button>
        <div className="ml-4">
          <h2 className="text-xl font-bold">{groupname}</h2>
          <p className="text-gray-600 mt-1">{cardData.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Sidebar with Cards */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-6">
          <ul className="space-y-4">
            {terms.map((item, idx) => (
              <li key={idx}>
                <button
                  className={`block w-full text-left p-2 break-all rounded-md ${
                    idx === showData
                      ? "bg-blue-100 text-blue-800 font-bold"
                      : "text-gray-600"
                  }`}
                  onClick={() => setAndShowData(idx)}
                >
                  {`${idx + 1}. ${item.term_name}`}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Image */}
          <div
            className="w-[15rem]
          md:w-[35rem] p-5 flex flex-col md:flex-row gap-3 md:p-8 bg-gray-200 rounded shadow-md"
          >
            <div className="rounded overflow-hidden w-full md:[50%]">
              {terms[showData].term_image ? (
                <img
                  src={terms[showData].term_image}
                  alt=""
                  className="object-contain w-full h-52 md:h-64 p-2"
                />
              ) : (
                <span className="text-red-700 text-xl">
                  No image provided..
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex justify-start items-center text-wrap max-h-max break-all w-full md:[50%]">
              <p className="break-words text-gray-600 p-4 bg-white rounded">
                {terms[showData].description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 flex-row md:flex-col shadow-lg h-16 items-center rounded md:gap-3 md:h-full px-1 md:justify-center md:w-[9rem]">
            <button
              className="flex items-center text-blue-600"
              onClick={() => setModalOpen(true)}
            >
              <FaShare className="mr-2" />
              Share
            </button>
            <button
              className="flex items-center text-green-600"
              type="button"
              onClick={handleGeneratePdf}
            >
              <FaFileDownload className="mr-2" />
              Download
            </button>
            <button
              className="flex items-center text-red-600"
              onClick={() => window.print()}
            >
              <FaPrint className="mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Carousel for Navigation */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button className=" p-2 rounded-full" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <div className="flex space-x-2">
          {terms.map((item, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full ${
                idx === showData ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setAndShowData(idx)}
            />
          ))}
        </div>
        <button className="p-2 rounded-full" onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>

      {/* share buttons */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            {isCopy ? <h1 className="copied">Copied</h1> : ""}
            <h3 className="text-lg font-bold mb-4">Share this page</h3>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="border rounded p-2 w-full mr-2"
              />
              <button onClick={handleCopy}>
                {!isCopy ? (
                  <FaCopy className="text-gray-400" />
                ) : (
                  <FaCheckCircle className="text-green-600" />
                )}
              </button>
            </div>
            <div className="flex mt-4 space-x-4 justify-center">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setModalOpen(false);
                  setCopy(!isCopy);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCardData;
