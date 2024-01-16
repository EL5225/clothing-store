import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload) => await register(payload),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload) => await login(payload),
  });
};
