import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../../components";
import { Button } from "../../components/button";
import { useState } from "react";
import { useRegister } from "./hooks";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate, status } = useRegister();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      mutate(
        registerData,
        {
          onSuccess: () => {
            navigate("/auth/login");
          },
        },
        {
          onError: (err) => {
            Promise.reject(err);
          },
        }
      );
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
        className="flex flex-col items-center w-auto md:w-[25rem] h-auto py-10 gap-6 rounded-md shadow-lg bg-white">
        <h3 className="text-2xl font-semibold">Daftar Akun</h3>

        <div className="w-full h-full flex flex-col items-center gap-12">
          <div className="flex flex-col w-full px-12 items-center justify-center gap-4">
            <TextField
              name="name"
              placeholder="Cynthia"
              label="Nama"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />
            <TextField
              name="email"
              placeholder="email@example.com"
              label="Email"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
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
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full flex flex-col justify-center px-12 gap-4">
            <Button loading={status === "pending"} type="submit">
              Daftar
            </Button>

            <span className="text-xs">
              Sudah punya akun?{" "}
              <Link
                to="/auth/login"
                className="hover:border-b border-black font-bold">
                Masuk
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};
