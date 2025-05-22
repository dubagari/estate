import React from "react";
import Button from "./components/Button";

const Search = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="border border-b-2 md:border-r-2 md:min-h-screen p-7">
        <form>
          <div className="flex items-center gap-2 mb-6">
            <label className="whitespace-nowrap font-semibold capitalize">
              search terms:
            </label>
            <input
              type="text"
              id="searchTerms"
              placeholder="search..."
              className="w-full p-2 border rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Type:
            </label>
            <input type="checkbox" className="w-5" id="all" />
            <span>Rent & sell</span>
            <input type="checkbox" className="w-5" id="rent" />
            <span>Rent</span>
            <input type="checkbox" className="w-5" id="sell" />
            <span>sell</span>
            <input type="checkbox" className="w-5" id="offer" />
            <span>Offer</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Amenities:
            </label>
            <input type="checkbox" className="w-5" id="Parking" />
            <span>Parking</span>
            <input type="checkbox" className="w-5" id="furnished" />
            <span>Funished</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <label className="whitespace-nowrap font-semibold capitalize ">
              Sort:
            </label>
            <select id="sort_order" className="p-2 rounded-lg">
              <option>price high to low</option>
              <option>price low to high</option>
              <option>Latest</option>
              <option>Older</option>
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
