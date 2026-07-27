import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./components/Button";
import ListingsItems from "./components/ListingsItems";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showmore, setShowmore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTerm = urlParams.get("searchTerm");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (
      searchTerm ||
      type ||
      parking ||
      furnished ||
      offer ||
      sort ||
      order
    ) {
      setSidebardata({
        searchTerm: searchTerm || "",
        type: type || "all",
        parking: parking === "true",
        furnished: furnished === "true",
        offer: offer === "true",
        sort: sort || "createdAt",
        order: order || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);

        const searchQuery = urlParams.toString();

        const res = await fetch(`${import.meta.env.VITE_URL}/api/listing/get?${searchQuery}`);

        const data = await res.json();

        setListings(data);

        setShowmore(data.length >= 9);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (["all", "rent", "sell"].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        type: e.target.id,
      });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");

      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
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

    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    try {
      const startIndex = listings.length;

      const urlParams = new URLSearchParams(location.search);

      urlParams.set("startIndex", startIndex);

      const res = await fetch(`${import.meta.env.VITE_URL}/api/listing/get?${urlParams.toString()}`);

      const data = await res.json();

      if (data.length < 9) {
        setShowmore(false);
      }

      setListings((prev) => [...prev, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-5">
      {/* Sidebar */}
      <div className="lg:col-span-1 border rounded-xl p-6 h-fit">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <label className="font-semibold whitespace-nowrap">
              Search:
            </label>

            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full border rounded-lg p-2 outline-none"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center mb-4">
            <label className="font-semibold">Type:</label>

            <input
              type="checkbox"
              id="all"
              checked={sidebardata.type === "all"}
              onChange={handleChange}
            />
            <span>All</span>

            <input
              type="checkbox"
              id="rent"
              checked={sidebardata.type === "rent"}
              onChange={handleChange}
            />
            <span>Rent</span>

            <input
              type="checkbox"
              id="sell"
              checked={sidebardata.type === "sell"}
              onChange={handleChange}
            />
            <span>Sell</span>

            <input
              type="checkbox"
              id="offer"
              checked={sidebardata.offer}
              onChange={handleChange}
            />
            <span>Offer</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center mb-4">
            <label className="font-semibold">Amenities:</label>

            <input
              type="checkbox"
              id="parking"
              checked={sidebardata.parking}
              onChange={handleChange}
            />
            <span>Parking</span>

            <input
              type="checkbox"
              id="furnished"
              checked={sidebardata.furnished}
              onChange={handleChange}
            />
            <span>Furnished</span>
          </div>

          <div className="flex gap-2 items-center mb-6">
            <label className="font-semibold">Sort:</label>

            <select
              id="sort_order"
              className="border rounded-lg p-2"
              value={`${sidebardata.sort}_${sidebardata.order}`}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">
                Price High to Low
              </option>
              <option value="regularPrice_asc">
                Price Low to High
              </option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <Button title="Search" />
        </form>
      </div>

      {/* Listings */}
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold mb-6 text-slate-700">
          Listing Results
        </h1>

        {loading && (
          <p className="text-center text-lg">Loading...</p>
        )}

        {!loading && listings.length === 0 && (
          <p className="text-center text-xl">
            No Listings Found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {!loading &&
            listings.map((listing) => (
              <ListingsItems
                key={listing._id}
                listings={listing}
              />
            ))}
        </div>

        {showmore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={onShowMoreClick}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;