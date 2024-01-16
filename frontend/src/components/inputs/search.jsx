import { CiSearch } from "react-icons/ci";

export const Search = ({ onChange }) => {
  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        onChange={onChange}
        className="w-full rounded-2xl focus:outline-none px-6 py-1 pb-1.5 font-semibold"
        placeholder="Cari nama product"
      />
      <CiSearch className="absolute text-black text-xl top-1.5 right-2.5" />
    </div>
  );
};
