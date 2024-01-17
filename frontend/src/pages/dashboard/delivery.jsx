import { useMemo } from "react";
import { useFinishDelivery, useGetDeliveries } from "../../services/hooks";
import { DeliveryCard } from "../../components/deliveryCard";

export const DeliveryPage = () => {
  const { data, refetch } = useGetDeliveries();

  const deliveries = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const { mutate, status } = useFinishDelivery();

  return (
    <section className="w-full h-full flex flex-col items-center md:items-start px-4 lg:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Delivery</h1>

      <div className="flex flex-col w-full py-4 gap-4">
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
              mutate(delivery?.id, {
                onSuccess: () => {
                  refetch();
                  return alert("Pengiriman selesai");
                },
                onError: (err) => {
                  Promise.reject(err);
                  alert("Gagal mengirimkan pengiriman");
                },
              });
            }}
          />
        ))}
      </div>
    </section>
  );
};
