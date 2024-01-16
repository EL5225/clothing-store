import { Spinner } from "./spinner";

export const LazyLoading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Spinner width="w-12" height="h-12" />
    </div>
  );
};
