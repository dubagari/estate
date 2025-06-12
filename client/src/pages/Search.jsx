import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import ListingsItems from "./components/ListingsItems";
import { set } from "mongoose";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setLestings] = useState([]);
  const [showmore, setShowmore] = useState(false);

  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTerm = urlParams.get("searchTerm");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (searchTerm || type || parking || furnished || offer || sort || order) {
      setSidebardata({
        searchTerm: searchTerm || "",
        type: type || "all",
        parking: parking === "true" ? true : false,
        furnished: furnished === "true" ? true : false,
        offer: offer === "true" ? true : false,
        sort: sort || "created_at",
        order: order || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowmore(true);
      }
      setLestings(data);
      setLoading(false);
    };

    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);

    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowmore(false);
    }
    setLestings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="border border-b-2 md:border-r-2 md:min-h-screen p-7">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <label className="whitespace-nowrap font-semibold capitalize">
              search terms:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="search..."
              className="w-full p-2 border rounded-lg outline-none"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Type:
            </label>
            <input
              type="checkbox"
              className="w-5"
              id="all"
              onChange={handleChange}
              checked={sidebardata.type === "all"}
            />
            <span>Rent & sell</span>
            <input
              type="checkbox"
              className="w-5"
              id="rent"
              onChange={handleChange}
              checked={sidebardata.type === "rent"}
            />
            <span>Rent</span>
            <input
              type="checkbox"
              className="w-5"
              id="sell"
              onChange={handleChange}
              checked={sidebardata.type === "sell"}
            />
            <span>sell</span>
            <input
              type="checkbox"
              className="w-5"
              id="offer"
              onChange={handleChange}
              checked={sidebardata.offer}
            />
            <span>Offer</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Amenities:
            </label>
            <input
              type="checkbox"
              className="w-5"
              id="parking"
              onChange={handleChange}
              checked={sidebardata.parking}
            />
            <span>Parking</span>
            <input
              type="checkbox"
              className="w-5"
              id="furnished"
              onChange={handleChange}
              checked={sidebardata.furnished}
            />
            <span>Funished</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Sort:
            </label>
            <select
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              id="sort_order"
              className="p-2 rounded-lg"
            >
              <option value="regularprice_desc">price high to low</option>
              <option value="regularprice_asc">price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Older</option>
            </select>
          </div>
          <div className="mt-6">
            <Button title="search" />
          </div>
        </form>
      </div>

      <div className=" w-full border-b-2">
        <h1 className="text-3xl font-semibold mt-5 p-3 capitalize  text-slate-700">
          listing result:
        </h1>
        <div className="pt-3 flex justify-center items-center">
          {!loading && listings.length === 0 && (
            <p className="text-2xl">No listing</p>
          )}
        </div>
        <div className="text-center pt-4 text-slate-600">
          {loading && <p>Loading...</p>}
        </div>
        <div className="flex   gap-5 flex-wrap p-4">
          {!loading &&
            listings &&
            listings?.map((listings) => (
              <ListingsItems key={listings._id} listings={listings} />
            ))}
        </div>
        {showmore && (
          <button
            className="text-green-500 text-lg my-5 text-center p-7 w-full hover:underline"
            onClick={onShowMoreClick}
          >
            show more...
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
