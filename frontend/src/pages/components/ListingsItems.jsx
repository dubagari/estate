import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

const ListingsItems = ({ listings }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg overflow-hidden w-[300px] flex transition-shadow  ">
      <Link to={`/listing/${listings._id}`}>
        <img
          src={listings.imageUrl[0]}
          alt=""
          className="h-[324px] w-full sm:h-[220] rounded-lg hover:scale-90 transition duration-300 object-cover"
        />
        <div className="p-3">
          <div className=" truncate font-semibold text-lg">
            {listings.name}
            <div className="flex gap-1 items-center mt-2">
              <MdLocationOn className="w-4 h-4 text-green-700 " />
              <p>{listings.address}</p>
            </div>
          </div>
          <div className="mt-2 p-2  text-slate-700 ">
            <p className="line-clamp-2 ">{listings.description}</p>
            <p className="mt-4 font-semibold">
              {" "}
              $
              {listings?.offer
                ? listings?.discountprice.toLocaleString("en-US")
                : listings?.regularprice.toLocaleString("en-US")}
              {listings?.type === "rent" && " / month"}
            </p>
          </div>
          <ul className="flex items-center mt-3 gap-3 sm:gap-6 capitalize">
            <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
              <FaBed className="text-lg" />
              {listings?.bedrooms > 1
                ? `${listings?.bedrooms} beds`
                : `${listings?.bedrooms} bed`}
            </li>
            <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
              <FaBath className="text-lg" />
              {listings?.bathrooms > 1
                ? `${listings?.bathrooms} baths`
                : `${listings?.bathrooms} bath`}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default ListingsItems;
