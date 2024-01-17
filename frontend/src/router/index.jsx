import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, ContentLayout } from "../layouts";
import { lazily } from "react-lazily";
import { Suspense } from "react";
import { Error404, LazyLoading, Navbar } from "../components";
import { GuardAuth, GuardUser } from "./guards";
import { SearchContextProvider } from "../context/context";

const {
  Login,
  Register,
  LandingPage,
  ProfilePage,
  CartPage,
  DeliveryPage,
  AddProductPage,
} = lazily(() => import("../pages"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SearchContextProvider>
        <Navbar />
        <ContentLayout />
      </SearchContextProvider>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <GuardUser>
            <Suspense fallback={<LazyLoading />}>
              <ProfilePage />
            </Suspense>
          </GuardUser>
        ),
      },
      {
        path: "/cart",
        element: (
          <GuardUser>
            <Suspense fallback={<LazyLoading />}>
              <CartPage />
            </Suspense>
          </GuardUser>
        ),
      },
      {
        path: "/delivery",
        element: (
          <GuardUser>
            <Suspense fallback={<LazyLoading />}>
              <DeliveryPage />
            </Suspense>
          </GuardUser>
        ),
      },
      {
        path: "/product/add",
        element: (
          <GuardUser>
            <Suspense fallback={<LazyLoading />}>
              <AddProductPage />
            </Suspense>
          </GuardUser>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <GuardAuth>
        <AuthLayout />
      </GuardAuth>
    ),
    children: [
      {
        path: "login",

        element: (
          <Suspense fallback={<LazyLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
