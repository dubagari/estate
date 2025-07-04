import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "./components/OAuth";
import Button from "./components/Button";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure("Email has already been taken"));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signInFailure(error.massage));
    }
  };

  useEffect(() => {
    dispatch(signInFailure(null)); // clear error on mount
  }, [dispatch]);
  console.log(formData);

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-2 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <Button disabled={loading} title={loading ? "Loading" : "sign up"} />

        <OAuth />
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700"> sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
