import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

export const ContentLayout = () => {
  document.body.style.overflow = "hidden";

  return (
    <main className="w-full h-screen md:h-[83vh] flex items-center bg-antiquewhite font-poppins pt-28 md:pt-0">
      <section className={`w-full h-full flex justify-center items-center`}>
        <Outlet />
      </section>
      <Sidebar />
    </main>
  );
};
