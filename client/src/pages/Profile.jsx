import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7 capitalize">
        profile
      </h1>
      <form className="flex flex-col gap-4 mt-4">
        <img
          className="self-center rounded-full h-20 w-20 cursor-pointer mt-2"
          src={currentUser.avater}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="rounded-lg p-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="rounded-lg p-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="rounded-lg p-2 focus:outline-none"
        />
        <button className="bg-slate-700 text-white p-2 uppercase rounded-lg hover:opacity-95 disabled:80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delate account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
