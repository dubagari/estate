import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-6xl flex justify-between p-3 mx-auto items-center ">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500 capitalize">real</span>
            <span className="text-slate-700 ">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 rounded-md p-2 flex items-center">
          <input
            type="text"
            placeholder="Saerch..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-400" />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-700 hidden sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to={"about"}>
            <li className="text-slate-700 hidden sm:inline  hover:underline">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avater}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
