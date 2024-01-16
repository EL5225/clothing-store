import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }

  return context;
};
