import { FaRegTrashAlt } from "react-icons/fa";

export const CartCard = ({
  image,
  productName,
  amount,
  price,
  total,
  onRemove,
}) => {
  return (
    <div className="relative flex flex-col md:items-center md:flex-row w-[90%] xl:w-[70%] md:h-[8.5rem] p-6 md:px-5 md:py-2 gap-10 bg-white rounded-md border-2 border-black shadow-md">
      <figure>
        <img
          src={image}
          alt="cart"
          className="w-[8rem] h-[7.5rem] md:w-[7rem] md:h-[6.5rem] rounded-md"
        />
      </figure>

      <div className="flex flex-col gap-1.5 h-full py-2">
        <h2 className="text-2xl font-bold">{productName}</h2>
        <span className="text-xl font-medium">
          Rp{price?.toLocaleString("id-ID")} x {amount} buah
        </span>
        <span className="text-xl font-semibold">
          Total: Rp{total?.toLocaleString("id-ID")}
        </span>
      </div>

      <button
        onClick={onRemove}
        className="absolute flex items-center justify-center right-14 top-16 md:right-10 md:top-12">
        <FaRegTrashAlt className="text-red-600 text-4xl" />
      </button>
    </div>
  );
};
