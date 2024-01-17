import { IoPersonCircleOutline } from "react-icons/io5";
import { FaShoppingCart, FaTruck } from "react-icons/fa";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { Fragment, useMemo, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { getToken, removeToken } from "../utils/token";
import { GiArchiveRegister } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUserMe } from "../services/hooks";
import { FaAngleDoubleRight, FaEdit } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import Swal from "sweetalert2";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentSidebarOpen, setContentSidebarOpen] = useState(false);

  const token = getToken();

  const { data, isLoading } = useUserMe();

  const user = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const contentSidebarOne = [
    {
      title: isLoading ? "Loading..." : user?.name,
      icon: <IoPersonCircleOutline className="text-3xl" />,
      href: "/profile",
    },
    {
      title: "Cart",
      icon: <FaShoppingCart className="text-3xl" />,
      href: "/cart",
    },
    {
      title: "Delivery",
      icon: <FaTruck className="text-3xl" />,
      href: "/delivery",
    },
    {
      title: "Add Product",
      icon: <MdAddToPhotos className="text-3xl" />,
      href: "/product/add",
    },
    {
      title: "Edit Products",
      icon: <FaEdit className="text-3xl" />,
      href: "/edit-products",
    },
  ];

  const contentSidebarTwo = [
    {
      title: "Logout",
      icon: <MdOutlineLogout className="text-3xl" />,
      onClick: () => {
        Swal.fire({
          title: "Yakin ingin keluar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak!",
          confirmButtonText: "Iya!",
        }).then((res) => {
          if (res.isConfirmed) {
            removeToken();
            Swal.fire({
              title: "Logout berhasil!",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
      },
    },
  ];

  const contentNotLogin = [
    {
      title: "Login",
      icon: <MdLogin className="text-3xl" />,
      href: "/auth/login",
    },
    {
      title: "Register",
      icon: <GiArchiveRegister className="text-3xl" />,
      href: "/auth/register",
    },
  ];

  return (
    <aside
      className={`fixed z-40 top-0 right-0 md:relative flex flex-col items-center h-full bg-brown transition-all duration-300 ease-in-out ${
        sidebarOpen ? "px-8 py-10 w-[24rem] justify-between" : "w-[5em] py-6"
      } ${
        contentSidebarOpen
          ? "translate-x-0"
          : "translate-x-full md:translate-x-0"
      }`}>
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="hidden md:flex absolute items-center pl-3 w-[4rem] h-[2.8rem] top-10 -left-9 bg-brown rounded-full">
          <FaAngleDoubleRight className="text-white text-xl" />
        </button>
      )}
      {!sidebarOpen && (
        <button
          onClick={() => {
            setContentSidebarOpen(true);
            setSidebarOpen(true);
          }}
          className="md:hidden absolute flex items-center pl-3 w-[4rem] h-[2.8rem] top-32 -left-9 bg-brown rounded-full">
          <FaAngleDoubleRight className="text-white text-xl rotate-180" />
        </button>
      )}
      {sidebarOpen && contentSidebarOpen && (
        <button
          onClick={() => {
            setContentSidebarOpen(false);
            setSidebarOpen(false);
          }}
          className="md:hidden absolute flex items-center pl-3 w-[4rem] h-[2.8rem] bottom-60 left-4 bg-brown rounded-full">
          <FaAngleDoubleRight className="text-white text-4xl" />
        </button>
      )}
      <section className="flex flex-col w-full gap-8">
        {sidebarOpen ? (
          <Fragment>
            <Link
              to="/"
              onClick={() => {
                setSidebarOpen(false);
                setContentSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center py-2 bg-white rounded-3xl text-brown font-bold text-xl">
              Beranda
            </Link>
            <div className="w-full flex flex-col gap-4">
              {token
                ? contentSidebarOne.map((item, i) => (
                    <Link
                      key={i}
                      to={item?.href}
                      onClick={() => {
                        setSidebarOpen(false);
                        setContentSidebarOpen(false);
                      }}
                      className="flex items-center rounded-full gap-6 py-3 px-4 text-white font-semibold text-lg hover:bg-[#854040]">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))
                : contentNotLogin.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      onClick={() => {
                        setSidebarOpen(false);
                        setContentSidebarOpen(false);
                      }}
                      className="flex items-center rounded-full gap-6 py-3 px-4 text-white font-semibold text-lg hover:bg-[#854040]">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
            </div>
          </Fragment>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-full flex justify-center items-center">
            <RxHamburgerMenu className="text-3xl text-white" />
          </button>
        )}
      </section>
      {sidebarOpen && !!token && (
        <div className="w-full flex flex-col gap-4">
          {contentSidebarTwo.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="flex items-center rounded-full gap-6 py-3 px-4 text-white font-semibold text-lg hover:bg-[#854040]">
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};
