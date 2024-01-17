import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { useAddToCart } from "../services/hooks";
import { Spinner } from "./loadings";

export const Card = ({ name, price, stock, image, id }) => {
  const [number, setNumber] = useState(0);

  const { mutate, status } = useAddToCart(id);

  const handleMinus = () => {
    if (number > 0) {
      setNumber((prev) => prev - 1);
    }

    if (number < 0) {
      setNumber(0);
    }
  };
  const handleAdd = () => {
    setNumber((prev) => prev + 1);
    if (number >= stock) {
      setNumber(stock);
    }
  };

  const handleAddToCart = (e) => {
    try {
      e.preventDefault();
      mutate(
        { amount: number },
        {
          onSuccess: () => {
            setNumber(0);
            return alert("Product berhasil ditambahkan ke keranjang");
          },
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
    <div className="w-[16rem] h-[24rem] flex flex-col rounded-md px-5 gap-5 py-4">
      <figure className="w-full">
        <img
          src={image}
          alt="products"
          className="w-full h-[12rem] rounded-md"
        />
      </figure>

      <div className="w-full flex items-center gap-14">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-base font-bold">{name}</h1>
          <div className="w-full flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Rp{price?.toLocaleString("ID-id")}
            </h2>
            <span className="text-sm font-semibold">stock: {stock}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-0.5 bg-brown rounded-full">
        <button
          onClick={handleMinus}
          className={`flex items-center justify-center rounded-full ${
            number === 0 && "cursor-not-allowed"
          }`}>
          <FaCircleMinus className="rounded-full text-white" />
        </button>
        <span className="text-white">{number}</span>
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center rounded-full ${
            number >= stock && "cursor-not-allowed"
          }`}>
          <FaCirclePlus className="rounded-full text-white" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={number === 0 || status === "pending"}
        className="flex items-center group justify-center py-2 bg-brown hover:bg-opacity-90 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:bg-gray-400 duration-200">
        {status === "pending" ? (
          <Spinner width="w-6" height="h-6" />
        ) : (
          <FaCartPlus className="text-white text-2xl group-disabled:text-gray-100" />
        )}
      </button>
    </div>
  );
};
