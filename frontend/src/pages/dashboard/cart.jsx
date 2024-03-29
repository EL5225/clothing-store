import { useMemo } from "react";
import {
  useCheckoutCart,
  useDeleteProductFromCart,
  useGetCarts,
} from "../../services/hooks";
import { CartCard, Button, Spinner } from "../../components";
import Swal from "sweetalert2";

export const CartPage = () => {
  const { data, isLoading, refetch } = useGetCarts();

  const cart = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const { mutate: deleteCart } = useDeleteProductFromCart(cart?.id);
  const { mutate: checkoutCart, status } = useCheckoutCart();

  return (
    <section className="w-full h-full flex flex-col items-center md:items-start md:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Cart</h1>

      <div className="flex flex-col items-center md:items-start w-full py-4 gap-4">
        {isLoading && (
          <div className="flex items-center justify-center w-[90%] xl:w-[70%] px-2 py-8 bg-white rounded-md border border-black text-lg font-semibold">
            <Spinner />
          </div>
        )}
        {cart?.products?.length === 0 && (
          <div className="flex items-center justify-center w-[90%] xl:w-[70%] px-2 py-8 bg-white rounded-md border border-black text-lg font-semibold">
            Keranjang masih kosong
          </div>
        )}

        {cart?.products?.map((cart, i) => (
          <CartCard
            key={i}
            image={cart?.product?.image}
            productName={cart?.product?.name}
            price={cart?.product?.price}
            amount={cart?.amount}
            total={cart?.total_price}
            onRemove={() => {
              Swal.fire({
                title: "Menghapus product dari Cart?",
                icon: "question",
                showDenyButton: true,
                denyButtonText: "Tidak!",
                showConfirmButton: true,
                confirmButtonText: "Iya!",
              }).then((res) => {
                if (res.isConfirmed) {
                  deleteCart(cart?.product_id, {
                    onSuccess: () => {
                      Swal.fire({
                        title: "Product berhasil dihapus dari Cart!",
                        icon: "success",
                      });
                      refetch();
                    },
                    onError: (err) => {
                      Promise.reject(err);
                      return Swal.fire({
                        title: "Gagal menghapus product dari Cart",
                        icon: "error",
                      });
                    },
                  });
                }
              });
            }}
          />
        ))}
      </div>

      <div className="flex flex-col w-[90%] xl:w-[70%] gap-6">
        <div className="w-full p-2 bg-white rounded-md border border-black text-lg font-semibold mt-4">
          Total harga : Rp{cart?.grand_total?.toLocaleString("id-ID")}
        </div>

        <Button
          disabled={cart?.products?.length === 0 || status === "pending"}
          loading={status === "pending"}
          onClick={() => {
            checkoutCart(null, {
              onSuccess: () => {
                refetch();
                return Swal.fire({
                  title: "Checkout berhasil",
                  text: "Selahkan cek menu Delivery untuk informasi pengiriman",
                  icon: "success",
                  showConfirmButton: false,
                });
              },
              onError: (err) => {
                Promise.reject(err);
                return Swal.fire({
                  title: "Checkout gagal",
                  icon: "error",
                  showConfirmButton: false,
                });
              },
            });
          }}>
          Checkout
        </Button>
      </div>
    </section>
  );
};
