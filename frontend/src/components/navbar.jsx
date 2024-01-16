import { useMemo } from "react";
import { Search } from "./inputs";
import { getToken } from "../utils/token";
import { useUserMe } from "../services/hooks";
import { Link } from "react-router-dom";
import { useSearchContext } from "../context/context";

export const Navbar = () => {
  const { setSearch } = useSearchContext();

  const token = getToken();

  const { data, isLoading } = useUserMe();

  const user = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="fixed z-30 top-0 md:relative w-full h-[17vh] flex items-center justify-between pl-8 md:pl-14 py-4 bg-[#2b1c07]">
      <section className="flex items-center w-full xl:w-[85%] gap-6">
        {!!token && (
          <figure>
            {isLoading ? (
              <div className="w-[50px] h-[50px] rounded-full bg-gray-300 animate-pulse duration-100" />
            ) : (
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-[50px] h-[50px] rounded-full duration-200"
              />
            )}
          </figure>
        )}

        <div className="w-[65%] xl:w-[30%]">
          <Search onChange={handleSearch} />
        </div>
      </section>

      <Link
        to="/"
        className="hidden md:block font-Railey text-white w-[25%] xl:w-[15%] text-4xl">
        Clothing Store
      </Link>
    </header>
  );
};
