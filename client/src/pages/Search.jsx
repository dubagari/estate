import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    SearchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listing, setLesting] = useState([]);

  console.log(listing);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const SearchTerm = urlParams.get("SearchTerm");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (SearchTerm || type || parking || furnished || offer || sort || order) {
      setSidebardata({
        SearchTerm: SearchTerm || "",
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
      setLesting(data);
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
      setSidebardata({ ...sidebardata, type: e.target.value });
    }

    if (e.target.id === "SearchTerm") {
      setSidebardata({ ...sidebardata, SearchTerm: e.target.value });
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
    urlParams.set("SearchTerm", sidebardata.SearchTerm);

    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
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
              id="SearchTerm"
              placeholder="search..."
              className="w-full p-2 border rounded-lg outline-none"
              value={sidebardata.SearchTerm}
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
              value="created_at_desc"
              id="sort_order"
              className="p-2 rounded-lg"
            >
              <option value="regularprice_desc">price high to low</option>
              <option value="regularprice_asc">price low to high</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Older</option>
            </select>
          </div>
          <Button title="search" />
        </form>
      </div>

      <div className="text-3xl font-semibold mt-5 p-3 capitalize border-b-2 text-slate-700">
        <h1>listing result:</h1>
      </div>
    </div>
  );
};

export default Search;
