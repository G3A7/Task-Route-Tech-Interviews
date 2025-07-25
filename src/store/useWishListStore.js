import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishListStore = create(
  persist(
    (set, get) => ({
      wishList: [],
      addWishList: (pr) => {
        const tempWishList = get().wishList;
        const exist = tempWishList.find((i) => i.id === pr.id);
        if (exist) {
          set({
            wishList: tempWishList.filter((i) => {
              return i.id != pr.id;
            }),
          });
          toast.success("remove Successfully");
        } else {
          set({ wishList: [...tempWishList, pr] });
          toast.success("add Successfully");
        }
      },
      removeWishList: (id) => {
        set({ wishList: get().wishList.filter((i) => i.id != id) });
        toast.success("remove successfully");
      },
      clearWishList: () => {
        set({ wishList: [] });
        toast.success("Clear Successfully");
      },
    }),
    {
      name: "wishList",
    }
  )
);
