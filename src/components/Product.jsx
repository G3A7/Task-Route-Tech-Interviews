/* eslint-disable react/prop-types */
import { ShoppingBag } from "lucide-react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
function Product({ product, Highlight }) {
  const { addCart } = useCartStore();
  const { title, image, id } = product;
  const navigate = useNavigate();

  function highlightText(text, term) {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="bg-green-300 text-base-content font-semibold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <div className="w-full sm:w-1/3 md:w-1/4  p-3 ">
      <div className=" relative p-3 group  shadow overflow-hidden   hover:shadow-lg border border-green-400 rounded-md">
        <div
          onClick={() => {
            addCart(product);
          }}
          className=" absolute group-hover:left-[2%] flex items-center justify-center size-[35px] transition-all duration-300 top-[2%] left-[-30%] rounded-md shadow z-[55]  cursor-pointer text-base-200 bg-base-200"
        >
          <ShoppingBag className="text-green-700" />
        </div>

        <button
          onClick={() => {
            navigate(`/product/${id}`);
          }}
          className="absolute flex items-center justify-center size-[35px] group-hover:left-[2%] transition-all duration-300 top-[20%] left-[-30%] rounded-md shadow z-[55] text-base-200 bg-base-200 cursor-pointer  "
        >
          <Eye className="text-green-700 " />
        </button>
        <div className="h-[290px]  overflow-hidden">
          <img
            className="w-full h-full  object-contain hover:scale-[1.1] transition-all duration-300"
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
        <h3 className="text-xl font-medium  text-center">
          {highlightText(convertTitle(title), Highlight)}
        </h3>
      </div>
    </div>
  );
}

function convertTitle(title) {
  const term = title.slice(1, 20);
  const char = title.charAt(0).toUpperCase();
  return char + term;
}

export default Product;
