import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrl: [] });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handlefileuplod = async () => {
    if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
      try {
        setLoading(true);
        const promises = files.map((file) => storeImage(file));
        const Urls = await Promise.all(promises);
        setFormData({ ...formData, imageUrl: formData.imageUrl.concat(Urls) });
        setImageUploadError(false);
        setLoading(false);
      } catch (error) {
        setImageUploadError("Image Upload failed (2mb max per image )");
        setLoading(false);
      }
    } else {
      setImageUploadError("you can only upload 6 per listing");
      setLoading(false);
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

  return (
    <main className="max-w-4xl m-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength={69}
            minLength={10}
            className="p-3 focus:outline-none rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="p-3 focus:outline-none rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 focus:outline-none rounded-lg"
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5 " id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="funished" />
              <span>Funished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 my-7 flex-wrap ">
            <div className="flex gap-4 items-center">
              <input
                type="number"
                className="h-9 w-12 focus:outline-none"
                id="beds"
                min={1}
                max={10}
              />
              <span>beds</span>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                className="h-9 w-12 focus:outline-none"
                id="baths"
              />
              <span>baths</span>
            </div>
            <div className="flex gap-4 items-center">
              <input type="number" className="h-9 w-12 focus:outline-none" />
              <div className="flex flex-col items-center">
                <p>regular price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <input type="number" className="h-9 w-12 focus:outline-none" />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
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
              {loading ? "Loading..." : "Laod"}
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
                  className="text-red-700 hover:opacity-75 uppercase"
                >
                  delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-gray-800 text-white uppercase rounded-lg hover:shadow-lg disabled:opacity-95">
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
