"use client";
import React, { useState } from "react";

const InputField = () => {
  const [userInput, setUserInput] = useState("");
  const [availableLink, setAvailableLink] = useState([]);

  const handleLinkGeneartion = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    if (response.status === 201) {
      setAvailableLink([
        ...availableLink,
        `${process.env.NEXT_PUBLIC_BaseUrl}/go/${data.url}`,
      ]);
    }
  };

  const handleCopy = (key) => {
    window.navigator.clipboard.writeText(availableLink[key]);
    alert("Copied");
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-start gap-4"
        onSubmit={handleLinkGeneartion}
      >
        <h2 className="text-xl">Enter your link to get shorter version</h2>
        <div className="flex justify-center items-center gap-1 w-full">
          <input
            type="text"
            id="userInputUrl"
            onChange={(e) => setUserInput(e.target.value)}
            className="text-sm md:text-lg text-gray-700 outline-none h-10 p-2 rounded-l-xl "
          />
          <button
            type="submit"
            className="h-10 px-6 text-sm md:text-lg font-bold bg-white text-black rounded-r-xl"
          >
            Generate
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-start gap-4">
        {availableLink.length != 0 &&
          availableLink?.map((links, index) => (
            <div className="flex gap-1" key={index}>
              <p className="text-sm md:text-lg py-2 px-6 font-medium rounded-l-md bg-slate-400 text-black ">
                {links}
              </p>
              <button
                onClick={() => handleCopy(index)}
                className="py-2 px-8 text-sm md:text-lg font-bold  bg-slate-300 text-black rounded-r-xl"
              >
                Copy
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default InputField;
