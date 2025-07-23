const CustomizedBtn = ({ label, className = "", onClick, isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`font-heading px-5 py-2 text-white bg-gray-600 font-heading rounded-lg 
        md:bg-transparent md:text-black md:border-2 md:border-gray-400 
        md:hover:bg-gray-600 md:hover:text-white md:hover:border-white  
        transition duration-100 ease-in disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default CustomizedBtn;
