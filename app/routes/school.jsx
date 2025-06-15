import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router";

export default function School() {
  const [singleSchool, setSingleSchool] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchSingleSchool = async () => {
      try {
        const backendUrl = import.meta.env.BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/schools/${id}`);
        const data = await response.json();
        console.log("Success school was  fetched");
        setSingleSchool(data);
      } catch (error) {
        console.log("There was an error with geting the school", error.message);
      }
    };
    fetchSingleSchool();
  }, [id]);
  return (
    <main className="bg-[#fbf4da] h-full p-[10px] w-screen">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full px-4 py-2 shadow transition hover:cursor-pointer hover:scale-[1.05] hover:transition-all hover:duration-[0.3s] duration-[0.4s]"
        aria-label="Go back"
      >
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-blue-600 font-medium">Back</span>
      </button>
      <div className="h-full lg:flex items-center justify-center w-screen">
        {singleSchool ? (
          <div className="text-black">
            <h1 className="text-[20px] text-center lg:text-[30px] mb-[30px]">
              {singleSchool.data.name}
            </h1>

            <img
              className="rounded-[10px] w-[350px] lg:w-[700px] lg:justify-self-center"
              src={singleSchool.data.images[0]}
              alt=""
            />
            <p className="mt-[30px]">{singleSchool.data.description}</p>

            <ul className="mt-[20px] flex flex-col justify-center gap-[10px]">
              <div className="flex items-center gap-[70px] lg:gap-[110px]">
                <p className="bg-[#001822] text-white p-[10px] rounded-[10px]">
                  Location :{" "}
                </p>{" "}
                :<p>{singleSchool.data.location}</p>
              </div>

              <div className="flex items-center gap-[30px] lg:gap-[40px]">
                <p className="bg-[#001822] text-white p-[10px] rounded-[10px]">
                  Education System :{" "}
                </p>{" "}
                :<p>{singleSchool.data.system}</p>
              </div>

              <div className="flex items-center gap-[30px] lg:gap-[35px]">
                <p className="bg-[#001822] text-white p-[10px] rounded-[10px]">
                  Current Population :{" "}
                </p>
                :<p>{singleSchool.data.population} Students</p>
              </div>

              <div className="flex items-center gap-[20px] lg:gap-[105px]">
                <p className="bg-[#001822] text-white p-[10px] rounded-[10px]">
                  Fee/Term :{" "}
                </p>{" "}
                :<p>{singleSchool.data.fee}</p>
              </div>
            </ul>
            <p className="text-[20px] mt-[30px] lg:text-[30px]">
              Contact Details : {singleSchool.data.contacts}
            </p>
            <iframe
              className="w-[350px]  rounded-[10px]"
              src={singleSchool.data.map}
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <p className="text-black">Loading school data....</p>
        )}
      </div>
    </main>
  );
}
