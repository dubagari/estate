import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUsereFailure,
  deleteUserStatar,
  deleteUserSuccess,
  signoutUsereFailure,
  signoutUserStatar,
  signoutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileuploadError] = useState(false);
  const [formdata, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [showListing, setShowlistin] = useState(false);

  const dispatch = useDispatch();

  console.log(userListing);

  // console.log(file);
  // console.log(filePercentage);
  // console.log(formdata);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const stroageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(stroageRef, file);

    console.log(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prograss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePercentage(Math.round(prograss));
      },
      (error) => {
        setFileuploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formdata, avater: downloadUrl })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (data.succcess === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStatar());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.succcess === false) {
        dispatch(deleteUsereFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUsereFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signoutUserStatar());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.succcess === false) {
        dispatch(signoutUsereFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowListings = async () => {
    try {
      setListingError(false);
      setShowlistin(true);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.succcess === false) {
        setListingError(true);

        return;
      }
      setUserListing(data);
    } catch (error) {
      setListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.succcess === false) {
        console.log(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    setUserListing((prv) => prv.filter((listing) => listing._id !== listingId));
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7 capitalize">
        profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="file"
          ref={fileref}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileref.current.click()}
          className="self-center rounded-full h-20 w-20 cursor-pointer mt-2"
          src={formdata.avater || currentUser.avater}
          alt="profile"
        />

        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-600">Error Image uploaded</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-500 capitalize">{`image uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-600 capitalize">
              image successeful uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
          className="rounded-lg p-2 focus:outline-none"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="rounded-lg p-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="rounded-lg p-2 focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-2 uppercase rounded-lg hover:opacity-95 disabled:80"
        >
          {loading ? "loading" : "update"}
        </button>

        <Link
          className="p-3 bg-green-700 rounded-lg text-white text-center uppercase hover:opacity-95"
          to={"/create-listing"}
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-500 cursor-pointer"
        >
          Delate account
        </span>
        <span onClick={handleLogout} className="text-red-500 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-green-600">
        {updateSuccess ? "user is updated successfully" : ""}
      </p>

      <button
        onClick={handleShowListings}
        className="text-green-700 w-full my-4 font-semibold"
      >
        show listing
      </button>
      <p className="text-red-500">{listingError ? "erorr" : ""}</p>
      {showListing && (
        <>
          {userListing && userListing.length > 0 ? (
            <div className="flex flex-col my-5">
              <h1 className="font-semibold text-3xl text-center mb-7">
                Your listing
              </h1>
              {userListing.map((listings) => (
                <div
                  key={listings._id}
                  className="flex justify-between items-center border p-2 gap-2"
                >
                  <Link to={`listing/${listings._id}`}>
                    <img
                      src={listings.imageUrl[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="hover:underline truncate flex-1"
                    to={`listing/${listings._id}`}
                  >
                    <p>{listings.name}</p>
                  </Link>

                  <div className="flex flex-col  p-2">
                    <Link to={`/update-listing/${listings._id}`}>
                      <button className="uppercase text-green-500">edit</button>
                    </Link>
                    <button
                      onClick={() => handleListingDelete(listings._id)}
                      className="uppercase text-red-500"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">nothing to show</p>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
