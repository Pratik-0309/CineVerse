import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
import ActorDetails from "./pages/ActorDetails.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import WatchList from "./pages/WatchList.jsx";
import Register from "./pages/Register.jsx";

function App() {

  const location = useLocation();
  const hideLayout = location.pathname === "/register"

  return (
    <>
     {!hideLayout && <Navbar />}
      <Toaster />
      <main className={hideLayout ? "" : "pt-10"}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/watchlist" element={<WatchList/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/movie/:movieId" element={<MovieDetails/>} />
          <Route path="/actor/:actorId" element={<ActorDetails/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
