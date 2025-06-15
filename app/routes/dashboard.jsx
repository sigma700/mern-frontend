import React from "react";

function Dashboard() {
  return (
    <main className="text-black flex items-center justify-center">
      <nav className="absolute top-6 left-6">
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
      </nav>
      <style>
        {`
                    main {
                            min-height: 100vh;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `}
      </style>
      <div className="bg-white/80 rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center">
        <h1 className="lg:text-[30px] font-bold mb-4 text-center">
          User{" "}
          <span className="text-blue-600 text-[20px] lg:text-[35px]">
            Dashboard
          </span>
        </h1>
        <p className="mb-8 text-gray-700 text-center">
          Here is a list of schools you showed interest
        </p>
        <div className="w-full">
          <div className="bg-blue-50 rounded-xl p-6 flex flex-col gap-4 shadow-inner">
            {/* Example of saved data cards */}
            <div className="bg-white rounded-lg p-4 shadow flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="font-semibold text-lg">Harvard University</div>
                <div className="text-gray-500 text-sm">Cambridge, MA</div>
              </div>
              <button className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">
                Remove
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="font-semibold text-lg">Stanford University</div>
                <div className="text-gray-500 text-sm">Stanford, CA</div>
              </div>
              <button className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">
                Remove
              </button>
            </div>
            {/* Placeholder for when there are no saved schools */}
            {/* <div className="text-center text-gray-400 py-8">No saved schools yet.</div> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
