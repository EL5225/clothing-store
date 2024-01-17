import { useEffect, useMemo, useState } from "react";
import { useGetProductById, useUpdateProduct } from "../../services/hooks";
import { Button, TextField } from "../../components";
import { FaPen } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(null);

  const { id } = useParams();

  const { data, refetch } = useGetProductById(id);

  const product = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const [products, setProducts] = useState({
    name: product?.name,
    amount: product?.amount,
    price: product?.price,
  });

  const { mutate, status } = useUpdateProduct(id);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setEditImage(url);
    setImage(file);
  };

  const navigate = useNavigate();

  const handleEdit = (e) => {
    try {
      e.preventDefault();

      console.log({ ...products, image });

      mutate(
        {
          ...products,
          image,
        },
        {
          onSuccess: () => {
            setProducts({
              name: "",
              amount: 0,
              price: 0,
            });
            setEditImage(null);
            refetch();
            Swal.fire({
              title: "Berhasil edit product",
              icon: "success",
              showConfirmButton: false,
            });
            navigate("/");
          },
          onError: (err) => {
            Promise.reject(err);
            return Swal.fire({
              title: "Gagal edit product",
              icon: "error",
              showConfirmButton: false,
            });
          },
        }
      );
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    setProducts({
      name: product?.name,
      amount: product?.amount,
      price: product?.price,
    });
  }, [product]);

  return (
    <section className="w-full h-full flex flex-col items-center md:items-start md:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Edit Product</h1>

      <div className="relative flex flex-col">
        <label
          htmlFor="image"
          className="relative w-[200px] h-[200px] rounded-full cursor-pointer">
          <img
            src={editImage || product?.image}
            alt="avatar"
            className="w-[200px] h-[200px] rounded-md"
          />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="appearance-none hidden"
          onChange={handleFile}
        />

        <div className="absolute rounded-md w-[200px] h-[200px] flex justify-center items-center bg-black bg-opacity-40 pointer-events-none">
          <FaPen className="text-xl text-white" />
        </div>
      </div>

      <form
        onSubmit={handleEdit}
        className="flex flex-col w-[80%] xl:w-[35%] gap-5">
        <TextField
          name="name"
          label="Nama Product"
          value={products?.name}
          onChange={(e) => {
            setProducts({
              ...products,
              name: e.target.value,
            });
          }}
        />
        <TextField
          name="amount"
          label="Jumlah Product"
          value={products?.amount}
          onChange={(e) => {
            setProducts({
              ...products,
              amount: e.target.value,
            });
          }}
        />
        <TextField
          name="price"
          label="Harga Product (Rp.)"
          value={products?.price}
          onChange={(e) => {
            setProducts({
              ...products,
              price: e.target.value,
            });
          }}
        />

        <Button type="submit" loading={status === "pending"}>
          Edit
        </Button>
      </form>
    </section>
  );
};
