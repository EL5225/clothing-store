import { useMemo } from "react";
import { useFinishDelivery, useGetDeliveries } from "../../services/hooks";
import { DeliveryCard } from "../../components/deliveryCard";
import Swal from "sweetalert2";
import { Spinner } from "../../components";

export const DeliveryPage = () => {
  const { data, refetch, isLoading } = useGetDeliveries();

  const deliveries = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const { mutate, status } = useFinishDelivery();

  return (
    <section className="w-full h-full flex flex-col items-center md:items-start px-4 lg:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Delivery</h1>

      <div className="flex flex-col w-full py-4 gap-4">
        {isLoading && (
          <div className="flex items-center justify-center w-[90%] xl:w-[70%] px-2 py-8 bg-white rounded-md border border-black text-lg font-semibold">
            <Spinner />
          </div>
        )}

        {deliveries?.length === 0 && (
          <div className="flex items-center justify-center w-[90%] xl:w-[70%] px-2 py-8 bg-white rounded-md border border-black text-lg font-semibold">
            Belum ada pengiriman
          </div>
        )}

        {deliveries?.map((delivery, i) => (
          <DeliveryCard
            key={i}
            date={delivery?.created_at}
            status={delivery?.status}
            products={delivery?.products}
            loadingStatus={status}
            onFinish={() => {
              Swal.fire({
                title: "Selesaikan pengiriman?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
              }).then((res) => {
                if (res.isConfirmed) {
                  mutate(delivery?.id, {
                    onSuccess: () => {
                      refetch();
                      return Swal.fire({
                        title: "Pengiriman selesai",
                        icon: "success",
                        confirmButtonText: "Ok",
                      });
                    },
                    onError: (err) => {
                      Promise.reject(err);
                      return Swal.fire({
                        title: "Gagal menyelesaikan pengiriman",
                        icon: "error",
                        confirmButtonText: "Ok",
                      });
                    },
                  });
                }
              });
            }}
          />
        ))}
      </div>
    </section>
  );
};
