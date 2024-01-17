import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../../components";
import { Button } from "../../components/button";
import { useState } from "react";
import { useLogin } from "./hooks";
import { setToken } from "../../utils/token";
import Swal from "sweetalert2";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate, status } = useLogin();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      mutate(loginData, {
        onSuccess: (res) => {
          const token = res?.token;
          setToken(token);
          navigate("/");
          Swal.fire({
            title: "Login berhasil",
            icon: "success",
            showConfirmButton: false,
          });
        },
        onError: (err) => {
          Promise.reject(err);
        },
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl md:text-4xl font-bold">
        Welcome to{" "}
        <Link
          to="/"
          className="font-Railey text-3xl md:text-5xl font-medium duration-300 hover:text-yellow-800">
          Clothing Store
        </Link>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-auto md:w-[25rem] h-[25rem] pt-10 gap-6 rounded-md shadow-lg bg-white">
        <h3 className="text-2xl font-semibold">Masuk Akun</h3>

        <div className="w-full h-full flex flex-col items-center gap-12">
          <div className="flex flex-col w-full px-12 items-center justify-center gap-4">
            <TextField
              name="email"
              placeholder="email@example.com"
              label="Email"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full flex flex-col justify-center px-12 gap-4">
            <Button type="submit" loading={status === "pending"}>
              Masuk
            </Button>

            <span className="text-xs">
              Belum punya akun?{" "}
              <Link
                to="/auth/register"
                className="hover:border-b border-black font-bold">
                Daftar
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};
