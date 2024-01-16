import { Spinner } from "./loadings";

export const Button = ({ children, loading, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center bg-black rounded-md py-2 px-8 w-full text-white hover:bg-opacity-90 duration-200">
      {loading ? <Spinner width="w-5" height="h-5" /> : children}
    </button>
  );
};
