import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addCart: (pr) => {
        const cartItem = get().cart;
        const exist = cartItem.find((item) => item.id === pr.id);
        if (!exist) {
          set({ cart: [...get().cart, pr] }); // add product to cart
          console.log(get().cart);
          toast.success("add Successfully");
        } else {
          toast.error("item already added");
        }
      },
      removeCart: (id) => {
        set({ cart: get().cart.filter((pr) => pr.id !== id) }); // remove product
        toast.success("removed Success");
      },
    }),
    {
      name: "cart",
    }
  )
);
