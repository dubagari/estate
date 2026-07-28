const Button = ({ title, loading = false, className = "", disabled = false, ...props }) => {
  return (
    <button
      disabled={loading || disabled}
      className={`bg-slate-700 p-2 rounded-lg hover:opacity-95 uppercase w-full text-white disabled:opacity-80 ${className}`.trim()}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
