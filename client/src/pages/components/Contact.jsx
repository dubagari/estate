import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandloar = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        console.log(res);

        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLandloar();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4">
          <p className="">
            contact
            <span> {landlord.username}</span> for{" "}
            <span>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            placeholder="Enter your message..."
            rows="2"
            id="message"
            value={message}
            onChange={onChange}
            className="outline-none p-3 rounded-lg border w-full border-slate-700"
          />

          <Link
            to={`mailto:${landlord.email}?subject=regarding${listing.name}&body=${message}`}
            className=" bg-slate-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95"
          >
            send message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
