import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "./components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const Params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${Params.id}`);

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchlisting();
  }, []);

  return (
    <main>
      <div>
        {loading ? (
          <div className="text-3xl text-center pt-5">Loading...</div>
        ) : (
          <div>
            {listing && (
              <Swiper navigation>
                {listing.imageUrl.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[450px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="flex flex-col max-w-4xl mx-auto py-5 p-3 gap-4">
              <p className="text-2xl font-semibold">
                {listing?.name} - $
                {listing?.offer
                  ? listing?.discountprice.toLocaleString("en-US")
                  : listing?.regularprice.toLocaleString("en-US")}
                {listing?.type === "rent" && " / month"}
              </p>
              <p className="flex items-center mt-4 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing?.address}
              </p>
              <div className="flex gap-3">
                <p className="bg-red-500 w-full max-w-[200px] p-2 text-center capitalize rounded-lg  text-white">
                  {listing?.type === "sell" ? "for sell" : "for rent"}
                </p>

                {listing?.offer && (
                  <p className="bg-green-500 w-full max-w-[200px] p-2 text-center capitalize rounded-lg  text-white">
                    $
                    {(
                      +listing?.regularprice - +listing?.discountprice
                    ).toLocaleString("en-US")}
                  </p>
                )}
              </div>

              <p className="text-justify">
                <span className="font-semibold">Discription -</span>{" "}
                {listing?.description}
              </p>

              <ul className="flex items-center gap-3 sm:gap-6 capitalize">
                <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
                  <FaBed className="text-lg" />
                  {listing?.bedrooms > 1
                    ? `${listing?.bedrooms} beds`
                    : `${listing?.bedrooms} bed`}
                </li>
                <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
                  <FaBath className="text-lg" />
                  {listing?.bathrooms > 1
                    ? `${listing?.bathrooms} baths`
                    : `${listing?.bathrooms} bath`}
                </li>
                <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
                  <FaParking className="text-lg" />
                  {listing?.parking ? "Parking spot" : "no Parking spot"}
                </li>
                <li className="flex items-center whitespace-nowrap text-green-950 gap-1 text-sm font-semibold">
                  <FaChair className="text-lg" />
                  {listing?.furnished ? "furnished" : " not furnished"}
                </li>
              </ul>
              {currentUser &&
                listing?.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white uppercase rounded-lg p-3 my-3 font-semibold hover:opacity-95"
                  >
                    contact the land lord
                  </button>
                )}

              {contact && <Contact listing={listing} />}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Listing;
