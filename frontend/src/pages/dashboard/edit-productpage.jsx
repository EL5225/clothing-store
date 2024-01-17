import { useMemo } from "react";
import { useSearchContext } from "../../context/context";
import { useGetProducts } from "../../services/hooks";
import { Card } from "../../components";

export const EditProductPage = () => {
  const { search } = useSearchContext();

  const { data, refetch } = useGetProducts({
    search,
  });

  const productsList = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  return (
    <section className="w-full h-full overflow-y-auto">
      <h1 className="text-3xl font-bold px-14 pt-8">Edit Products</h1>
      {productsList?.products?.length === 0 && (
        <p className="text-2xl font-bold p-6">Products tidak ada</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 py-5 gap-y-10 justify-items-center">
        {productsList?.products?.map((item, i) => (
          <Card
            key={i}
            id={item?.id}
            name={item?.name}
            image={item?.image}
            stock={item?.amount}
            price={item?.price}
            isEdit
            refetch={refetch}
          />
        ))}
      </div>
    </section>
  );
};
