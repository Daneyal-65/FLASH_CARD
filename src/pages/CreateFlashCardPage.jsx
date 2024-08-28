import React, { useRef, useState } from "react";
import { FaCheckCircle, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import { setCardsData } from "../services/cards";
import toBase64 from "../utils/Base64";
import { UploadStyle } from "../utils/ButtonStyle";

export const CreateFlashCardPage = () => {
  const inputRef = useRef(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    groupname: "",
    description: "",
    terms: [
      {
        term_name: "",
        description: "",
        term_image: null,
      },
    ],
  };

  const handleSubmit = async (values, { resetForm }) => {
    const groupImgBase64 = uploadedImg
      ? await toBase64(uploadedImg).catch(() => null)
      : null;
    const terms = await Promise.all(
      values.terms.map(async (item) => ({
        ...item,
        term_image: item.term_image
          ? await toBase64(item.term_image).catch(() => null)
          : null,
      }))
    );

    const formData = {
      groupname: values.groupname,
      description: values.description,
      groupImg: groupImgBase64,
      terms,
    };

    dispatch(setCardsData(formData));
    resetForm();
    setUploadedImg(null);
  };

  const handleEdit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="h-screen flex flex-col items-center gap-4 md:gap-1">
          <div className="form flex flex-col gap-4 bg-gradient-to-t bg-gray-200 to-white shadow-md rounded-sm ">
            <div className="border-none flex flex-col gap-1 md:w-[40rem] lg:w-[62rem]">
              <div className="flex flex-row p-2 gap-1 w-full">
                <div className="w-full">
                  <label htmlFor="groupname" className="block">
                    Create Group*
                  </label>
                  <Field
                    id="groupname"
                    name="groupname"
                    type="text"
                    className="w-[100%] h-8 p-4 text-black border border-red-800 ml-2 rounded outline-none"
                    placeholder="Create Group"
                    required
                  />
                </div>

                <div className="flex justify-center items-center w-full h-[4rem] ml-8 mt-2 gap-1">
                  <label className="flex items-center p-2 m-2 bg-white border-[#db3838] border rounded font-[1rem] transition-all relative overflow-hidden hover:border-[#9999] hover:bg-[#f0f0f0]">
                    <FaUpload className="mr-3 font-[1.2rem]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      alt="imgSelect"
                      onChange={(e) => setUploadedImg(e.target.files[0])}
                      style={UploadStyle}
                    />
                  </label>
                  <span>
                    {uploadedImg ? (
                      <FaCheckCircle data-testid="FaCheckCircle" />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col px-2 pb-4">
                <label htmlFor="description">Add Description</label>
                <Field
                  data-testid="description"
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="write something here "
                  className="border border-red-900 rounded-md outline-none p-2"
                />
              </div>
            </div>
          </div>

          <FieldArray name="terms">
            {({ push, remove }) => (
              <div>
                {values.terms.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row w-[23rem] md:w-[35rem] lg:w-full items-center gap-4 pl-3 shadow-lg bg-gradient-to-t bg-gray-300 to-white mt-2"
                  >
                    <div className="w-12 h-12 bg-red-600 rounded-full text-white font-black text-center py-3 hover:bg-red-300 ">
                      {index + 1}
                    </div>
                    <div className="flex flex-col w-full md:w-[20rem] px-2">
                      <label htmlFor={`terms.${index}.term_name`}>
                        Enter Term *
                      </label>
                      <Field
                        id={`terms.${index}.term_name`}
                        name={`terms.${index}.term_name`}
                        type="text"
                        innerRef={inputRef}
                        className="h-8 p-4 md:mr-3 text-black border border-red-800 rounded-md outline-none"
                        placeholder="Enter Term "
                        required
                        data-testid="term"
                      />
                    </div>
                    <div className="flex flex-col w-full md:w-[20rem] px-2">
                      <label htmlFor={`terms.${index}.description`}>
                        Enter Definition*
                      </label>
                      <Field
                        id={`terms.${index}.description`}
                        name={`terms.${index}.description`}
                        type="text"
                        className="h-8 p-4 text-black border border-red-800 rounded-md outline-none"
                        placeholder="Enter Definition "
                        required
                        data-testid="term_d"
                      />
                    </div>
                    <div className="flex justify-center items-center h-16 ml-8 mb-4 md:m-12">
                      <label
                        className={`${
                          item.term_image
                            ? ""
                            : "h-12 w-28 pt-2 mt-6 pl-2 transition-shadow shadow-md"
                        } relative rounded-md p-[2px] bg-blue-200 hover:bg-blue-300 cursor-pointer border border-red-500`}
                      >
                        <div
                          className={`${
                            item.term_image
                              ? "h-[90px] w-[120px] bg-gray-200 overflow-hidden"
                              : ""
                          }`}
                        >
                          {item.term_image ? (
                            <img
                              src={URL.createObjectURL(item.term_image)}
                              alt="selected"
                              data-testid="selected"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600">Select Image</span>
                          )}
                        </div>
                        <input
                          alt="uploaded"
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              `terms.${index}.term_image`,
                              event.currentTarget.files[0]
                            );
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                      <div className="mt-6 ml-4 flex gap-2 md:flex-col">
                        <button
                          className="text-blue-600 cursor-pointer"
                          type="button"
                          onClick={handleEdit}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-700 cursor-pointer"
                          aria-label="Delete Image"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="text-blue-600 font-sans ml-12 mt-6"
                  onClick={() =>
                    push({ term_name: "", description: "", term_image: null })
                  }
                  type="button"
                >
                  + Add more
                </button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-center items-center mt-2">
            <button
              type="submit"
              className="m-auto w-40 h-14 rounded-md bg-red-700"
              data-testid="genrateCard"
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
