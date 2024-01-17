import { useState } from "react";
import { FaCartPlus, FaEdit } from "react-icons/fa";
import { FaCirclePlus, FaCircleMinus, FaTrash } from "react-icons/fa6";
import { useAddToCart, useDeleteProduct } from "../services/hooks";
import { Spinner } from "./loadings";
import { getToken } from "../utils/token";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Card = ({ name, price, stock, image, id, isEdit, refetch }) => {
  const [number, setNumber] = useState(0);

  const { mutate: addToCart, status: addToCartStatus } = useAddToCart(id);
  const { mutate: deleteProduct, status: deleteStatus } = useDeleteProduct();

  const token = getToken();

  const navigate = useNavigate();

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

      if (!token) {
        return Swal.fire({
          title: "Anda harus login terlebih dahulu",
          icon: "info",
        });
      }

      addToCart(
        { amount: number },
        {
          onSuccess: () => {
            setNumber(0);
            Swal.fire({
              title: "Produk ditambahkan ke Cart",
              icon: "success",
            });
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

  const handleEdit = () => {
    navigate(`/product/edit/${id}`);
  };

  const handleDelete = () => {
    try {
      Swal.fire({
        title: "Menghapus product?",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "Tidak!",
        showConfirmButton: true,
        confirmButtonText: "Iya!",
      }).then((result) => {
        if (result?.isConfirmed) {
          deleteProduct(id, {
            onSuccess: () => {
              refetch();
              Swal.fire({
                title: "Berhasil hapus product",
                icon: "success",
              });
            },
            onError: (err) => {
              Promise.reject(err);
              Swal.fire({
                title: "Gagal menghapus product",
                icon: "error",
              });
            },
          });
        }
      });
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
      {!isEdit && (
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
      )}

      {isEdit && (
        <div className="flex flex-col justify-center gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center group justify-center py-2 hover:bg-opacity-90 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:bg-gray-400 duration-200 bg-green-500">
            <FaEdit className="text-white text-2xl group-disabled:text-gray-100" />
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center group justify-center py-2 hover:bg-opacity-90 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:bg-gray-400 duration-200 bg-red-500">
            {deleteStatus === "pending" ? (
              <Spinner width="w-6" height="h-6" />
            ) : (
              <FaTrash className="text-white text-2xl group-disabled:text-gray-100" />
            )}
          </button>
        </div>
      )}

      {!isEdit && (
        <button
          onClick={handleAddToCart}
          disabled={number === 0 || addToCartStatus === "pending"}
          className={`flex items-center group justify-center py-2 hover:bg-opacity-90 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:bg-gray-400 duration-200 bg-brown`}>
          {addToCartStatus === "pending" ? (
            <Spinner width="w-6" height="h-6" />
          ) : (
            <FaCartPlus className="text-white text-2xl group-disabled:text-gray-100" />
          )}
        </button>
      )}
    </div>
  );
};
