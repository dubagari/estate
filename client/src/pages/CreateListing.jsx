import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    regularprice: 50,
    discountprice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(formData);

  const handlefileuplod = async () => {
    if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
      try {
        setUpLoading(true);
        const promises = files.map((file) => storeImage(file));
        const Urls = await Promise.all(promises);
        setFormData({ ...formData, imageUrl: formData.imageUrl.concat(Urls) });
        setImageUploadError(false);
        setUpLoading(false);
      } catch (error) {
        setImageUploadError("Image Upload failed (2mb max per image )");
        setUpLoading(false);
      }
    } else {
      setImageUploadError("you can only upload 6 per listing");
      setUpLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "parking"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === "number") {
      setFormData({
        ...formData,
        [e.target.id]: Number(e.target.value),
      });
    } else if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrl.length < 1)
        return setError("you must upload at lest 1 image");
      if (formData.regularprice < formData.discountprice)
        return setError("Discount price must be less tha regular price ");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl m-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-10"
      >
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            className="p-3 focus:outline-none rounded-lg"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="p-3 focus:outline-none rounded-lg"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 focus:outline-none rounded-lg"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 "
                id="sell"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Funished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 my-7 flex-wrap ">
            <div className="flex gap-4 items-center">
              <input
                type="number"
                className="h-9 w-12 focus:outline-none"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span>beds</span>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                className="h-9 w-12 focus:outline-none"
                id="bathrooms"
                required
                min="1"
                max="10"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>baths</span>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                className="h-9 w-12 focus:outline-none"
                id="regularprice"
                onChange={handleChange}
                min="50"
                max="100000"
                value={formData.regularprice}
              />
              <div className="flex flex-col items-center">
                <p>regular price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  className="h-9 w-12 focus:outline-none"
                  min="0"
                  max="100000"
                  id="discountprice"
                  onChange={handleChange}
                  value={formData.discountprice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <p className="text-xs">($/month)</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <p className="font-semibold">
            Image:{" "}
            <span className="font-normal text-gray-600">
              the fisrt image will be the cover (max 6)
            </span>{" "}
          </p>
          <div className="flex gap-3">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="w-full p-3 border border-gray-400 rounded-lg"
              type="file"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handlefileuplod}
              className="p-2 text-green-700 border border-green-700 rounded-lg hover:shadow-lg disabled:opacity-90"
            >
              {uploading ? "Loading..." : "upload"}
            </button>
          </div>
          <p className="text-red-600">{imageUploadError}</p>
          {formData.imageUrl.length > 0 &&
            formData.imageUrl.map((Url, index) => (
              <div key={Url} className="flex justify-between p-3 border">
                <img
                  src={Url}
                  alt="image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-700 hover:opacity-75 uppercase p-3"
                >
                  delete
                </button>
              </div>
            ))}
          <Button
            disabled={uploading || loading}
            title={loading ? "creating..." : "creating listing"}
          />

          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
