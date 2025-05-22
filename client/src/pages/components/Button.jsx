import React from "react";

const Button = ({ title, loading }) => {
  return (
    <div className="mt-6">
      <button className="bg-slate-700 p-2 rounded-lg hover:opacity-95 uppercase w-full text-white disabled:opacity-80">
        {title}
      </button>
    </div>
  );
};

export default Button;
