import { useState } from "react";
import { useCreateProduct } from "../../services/hooks";
import { Button, TextField } from "../../components";
import { FaPen } from "react-icons/fa";

export const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [products, setProducts] = useState({
    name: "",
    amount: 0,
    price: 0,
  });

  const { mutate, status } = useCreateProduct();

  const handleFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setEditImage(url);
    setImage(file);
  };

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
            return alert("Product berhasil ditambahkan");
          },
          onError: (err) => {
            Promise.reject(err);
            return alert(err?.response?.data?.message);
          },
        }
      );
    } catch (error) {
      Promise.reject(error);
    }
  };
  return (
    <section className="w-full h-full flex flex-col items-center md:items-start md:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Tambah Product</h1>

      <div className="relative flex flex-col">
        <label
          htmlFor="image"
          className="relative w-[200px] h-[200px] rounded-full cursor-pointer">
          <img
            src={editImage || "/imageupload.png"}
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
        {editImage && (
          <div className="absolute rounded-md w-[200px] h-[200px] flex justify-center items-center bg-black bg-opacity-40 pointer-events-none">
            <FaPen className="text-xl text-white" />
          </div>
        )}
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
          Tambah
        </Button>
      </form>
    </section>
  );
};
