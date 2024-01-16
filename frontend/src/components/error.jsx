import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <section className="flex h-screen justify-center items-center bg-[#faebd7] ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-black ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl ">
            Halaman tidak ditemukan
          </p>
          <p className="mb-4 text-lg font-light text-black">
            Maaf halaman yang anda cari tidak ada
          </p>
          <Link
            href="/"
            className="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
            Kembali
          </Link>
        </div>
      </div>
    </section>
  );
};
