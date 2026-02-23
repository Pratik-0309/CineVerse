import { Link } from "react-router-dom";

const MovieNotFound = () => {
  return (
    <div className="flex bg-black flex-col items-center justify-center text-sm max-md:px-4 py-20 pt-32 min-h-[60vh]">
      {/* Icon or Graphic */}
      <div className="mb-6 p-4 rounded-full bg-gray-900/50 border border-gray-800">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gray-500"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line>
          <line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
        Movie Not Found
      </h1>

      <div className="h-px w-64 rounded bg-linear-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>

      <p className="md:text-xl text-gray-400 max-w-lg text-center leading-relaxed">
        We couldn't find the specific movie you're looking for. <br />
        It might have been removed or the ID is incorrect.
      </p>

      <Link
        to="/"
        className="group flex items-center gap-1 bg-white hover:bg-gray-200 px-7 py-2.5 text-gray-800 rounded-full mt-10 font-medium active:scale-95 transition-all"
      >
        Explore Movies
        <svg
          className="group-hover:translate-x-0.5 transition"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default MovieNotFound;