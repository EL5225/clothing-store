import { FaCheck } from "react-icons/fa";
import { formatDate } from "../utils/helpers";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { Spinner } from "./loadings";

export const DeliveryCard = ({
  date,
  status,
  products,
  onFinish,
  loadingStatus,
}) => {
  let total_price = 0;

  products?.map((product) => {
    total_price += product?.total_price;
  });

  return (
    <div className="relative flex flex-col md:flex-row w-full items-start md:items-center xl:w-[85%] px-8 py-4 md:gap-10 bg-white rounded-md border-2 border-black shadow-md">
      {status ? (
        <FaTruckLoading className="text-9xl md:text-8xl relative" />
      ) : (
        <FaTruckFast className="text-9xl md:text-8xl" />
      )}

      <div className="flex flex-col justify-center gap-2 h-full py-2">
        <h2 className="text-2xl font-bold">{formatDate(date)}</h2>
        <span className="text-xl font-medium">
          {status ? "Telah dikirim" : "Dalam proses"}
        </span>
      </div>

      <div className="flex flex-col justify-center h-full gap-1 py-2">
        <h3 className="font-semibold mb-1">Products</h3>
        {products?.map((product, i) => (
          <span key={i} className="text-xs font-medium">
            {product?.products?.[0]?.name} x ({product?.amount})
          </span>
        ))}
        <span className="text-sm font-medium mt-1">
          Rp{total_price?.toLocaleString("id-ID")}
        </span>
      </div>

      {status ? (
        <div className="md:absolute flex items-center justify-center right-8">
          <FaCheck className="text-green-600 text-3xl" />
        </div>
      ) : (
        <button
          onClick={onFinish}
          disabled={loadingStatus === "pending"}
          className="md:absolute py-2 px-4 bg-green-600 rounded-md text-white hover:bg-green-700 flex items-center justify-center right-8">
          {loadingStatus === "pending" ? (
            <Spinner width="w-5" height="h-5" />
          ) : (
            "Selesaikan"
          )}
        </button>
      )}
    </div>
  );
};
