// import { Welcome } from "../welcome/welcome";
import AOS from "aos";
import { useEffect, useState } from "react";
import { Form, Link } from "react-router";

export function meta() {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

//project plan
//Welcome we hope you find a school that fits your preferences
//After that the person needs to begin searching for the prefered school

export default function Home() {
  const [serverData, setBackendData] = useState([]);
  const backendUrl = import.meta.env.Vite_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/schools`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setBackendData(data);
      });
  }, []);

  console.log({ serverData });

  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
  });

  return (
    <main className=" h-full p-[10px]">
      <div
        className="flex flex-col justify-center items-center h-screen"
        style={{
          backgroundImage: "url('/female-teacher-talking-with-students.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: "0.9",
        }}
      >
        {/* for mobile */}
        <h1 className="text-black text-[30px] mb-[30px] font-extrabold text-center">
          We understand that education is key we simply help you find it
        </h1>
        <p className="text-black text-center m-[10px] font-bold">
          Discover the best schools near your area that fit your{" "}
          <span className="text-white">needs</span>
        </p>
        <div
          data-aos="slide-left"
          className="p-[30px] text-center gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
        >
          <h1 className="text-[30px] text-black">Welcome</h1>
          <small className="text-black text-[20px]">Do you want to : </small>
          <div className="flex gap-[20px] mt-[30px]">
            <Link
              to={"/finding"}
              className="bg-black p-[10px] font-extralight border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]"
            >
              Find a School
            </Link>
            <Link
              to={"/listing"}
              className="bg-black p-[10px] font-extralight border-yellow-500 border active:bg-[#00df82] active:border-none active:text-black hover:bg-[#00df82] hover:border-none hover:cursor-pointer hover:transition-colors hover:duration-[0.2s] duration-[0.3s]"
            >
              List your School
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#fbf4da] text-black p-[5px]">
        <h2 className="text-center text-[30px]">Quick Search</h2>
        <Form
          method="post"
          className="flex items-center gap-[10px] text-white lg:justify-center"
        >
          <input
            className="p-[10px] bg-[#001822] rounded-[10px] lg:w-[500px] lg:p-[20px]"
            type="text"
            placeholder="Enter school name"
          />
          <button
            className="bg-white p-[10px] rounded-[50%] border border-black lg:hover:cursor-pointer lg:hover:bg-transparent lg:rounded-[10px] lg:hover:rounded-[50%] lg:hover:transition-all lg:hover:duration-[0.3s] duration-[0.4s]"
            type="submit"
          >
            <img src="/search.svg" alt="" />
          </button>
        </Form>
        <p className="p-[10px] text-[40px] text-center mt-[30px] font-light">
          Featured <span className="font-extrabold">Schools</span>
        </p>
        <div>
          {!serverData ? (
            <p>Loading...</p>
          ) : Array.isArray(serverData) ? (
            // If API returns array directly
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {serverData.map((school) => (
                <div
                  key={school._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2">{school.name}</h3>
                  {school.images?.[0] && ( // Only show first image if it exists
                    <img
                      src={school.images[0]}
                      alt={`${school.name} - Cover`}
                      className="w-full h-48 object-cover rounded hover:opacity-[0.7]"
                    />
                  )}
                  <p className="mt-2 text-gray-600">{school.description}</p>
                </div>
              ))}
            </div>
          ) : serverData.data ? (
            // If API returns { data: [...] }
            <div
              data-aos=""
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"
            >
              {serverData.data.map((school) => (
                <div
                  key={school._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2">{school.name}</h3>
                  {school.images?.[0] && (
                    <img
                      src={school.images[0]}
                      alt={`${school.name} - Cover`}
                      className="w-full h-48 object-cover rounded hover:opacity-[0.7] hover:cursor-pointer hover:transition-all hover:duration-[0.4s] hover:scale-[1.009]"
                    />
                  )}
                  <p className="mt-2 text-gray-600">{school.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No schools found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
