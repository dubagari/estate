import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingsItems from "./components/ListingsItems";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [sellListing, setSellListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListing);
  console.log(sellListing);
  console.log(rentListing);

  useEffect(() => {
    const offerListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        rentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const rentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        sellListing();
      } catch (error) {
        console.log(error);
      }
    };
    const sellListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();
        setSellListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    offerListing();
  }, []);
  return (
    <div>
      <div className="p-28 max-w-7xl px-6 mx-auto flex flex-col gap-6">
        <h1 className="text-slate-900 text-6xl font-bold ">
          Lorem ipsum dolor <span className="text-slate-600">consectetur</span>{" "}
          <br />
          adipisicing elit.
        </h1>
        <p className="text-slate-600 text-base/7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Facere
          quas dignissimos ipsam aspernatur iure necessitatibus <br /> ex fugiat
          ut tempore doloribus!
        </p>
        <Link
          to={"/search"}
          className="text-blue-700 hover:underline font-semibold"
        >
          let't get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((url) => (
            <SwiperSlide key={url._id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${url.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-7xl mx-auto flex flex-col my-10 gap-5">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="p-3">
              <h2 className="font-semibold text-2xl capitalize text-slate-700">
                resent offer
              </h2>
              <Link
                to={"/search?offer=true"}
                className="font-semibold text-blue-600 hover:underline"
              >
                {" "}
                show more offer...
              </Link>
            </div>

            <div className="flex gap-5 flex-wrap">
              {offerListing.map((listing) => (
                <ListingsItems listings={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {sellListing && sellListing.length > 0 && (
          <div className="">
            <div className="p-3">
              <h2 className="font-semibold text-2xl capitalize text-slate-700">
                resent place for sell
              </h2>
              <Link
                to={"/search?type=sell"}
                className="font-semibold text-blue-600 hover:underline"
              >
                {" "}
                show more resent place for sell...
              </Link>
            </div>

            <div className="flex gap-5 flex-wrap">
              {sellListing.map((listing) => (
                <ListingsItems listings={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="p-3">
              <h2 className="font-semibold text-2xl capitalize text-slate-700">
                resent place for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="font-semibold text-blue-600 hover:underline"
              >
                {" "}
                show more resent place for rent...
              </Link>
            </div>

            <div className="flex gap-5 flex-wrap">
              {rentListing.map((listing) => (
                <ListingsItems listings={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
