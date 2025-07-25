import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
function Navbar() {
  const { cart, removeCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="shadow border-base-300 border-b bg-base-100 text-base-content   sticky top-[-3px] z-[150] left-0 right-0   flex items-center justify-between  px-3 py-4">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-3xl font-bold cursor-pointer "
      >
        Route <span className="text-green-500">.</span>
      </h1>
      <div className="flex items-center gap-5 cursor-pointer ">
        <div className=" relative">
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle m-1 relative"
            >
              <ShoppingBag />
              <span className="absolute bg-green-400 rounded-full top-[-10px] right-[-2px] size-[23px] text-sm  text-white text-center">
                {cart?.length || 0}
              </span>
            </div>
            <div
              tabIndex={0}
              className={`dropdown-content max-h-80 overflow-y-auto  bg-base-100 rounded-box z-1  p-2 space-y-3 shadow-sm w-56   `}
            >
              {cart?.length > 0 ? (
                <>
                  {cart.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-primary/10 text-primary justify-between hover:bg-base-content/5 cursor-auto"
                      >
                        <p className="text-base-content">
                          {item?.title?.slice(0, 15)}
                        </p>
                        <p className="text-base-content">${item?.price}</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            removeCart(item?.id);
                          }}
                        >
                          <Trash2 className="text-red-600" />
                        </p>
                      </div>
                    );
                  })}

                  {cart.length > 0 && (
                    <div className="   text-center  rounded-md">
                      <button className=" btn w-full bg-green-400  text-white ">
                        Buy Now
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-center">Oops Cart is Empty😔</p>
                </>
              )}
            </div>
          </div>
        </div>

        <ThemeSelector />
      </div>
    </div>
  );
}

export default Navbar;
