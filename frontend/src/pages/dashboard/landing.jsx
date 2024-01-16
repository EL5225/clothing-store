import { useMemo } from "react";
import { Card } from "../../components";
import { useGetProducts } from "../../services/hooks";
import { useSearchContext } from "../../context/context";

export const LandingPage = () => {
  const { search } = useSearchContext();

  const { data } = useGetProducts({
    search,
  });

  const productsList = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  return (
    <section className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 py-5 gap-y-10 justify-items-center overflow-y-auto">
      {productsList?.products?.length === 0 && (
        <p className="text-2xl font-bold p-6">Products tidak ada</p>
      )}
      {productsList?.products?.map((item, i) => (
        <Card
          key={i}
          id={item?.id}
          name={item?.name}
          image={item?.image}
          stock={item?.amount}
          price={item?.price}
        />
      ))}
    </section>
  );
};
