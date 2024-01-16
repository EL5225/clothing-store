import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-[#faebd7] font-poppins">
      <Outlet />
    </main>
  );
};
