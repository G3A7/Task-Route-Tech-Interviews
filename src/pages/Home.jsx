import Product from "../components/Product";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Error from "../components/Error";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
function Home() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [productsFilter, setProductsFilter] = useState([]);
  const [Highlight, setHighlight] = useState("");
  const [filterName, setFilterName] = useState("all");
  
  async function getProducts() {
    try {
      setLoad(true);
      const { data } = await axiosInstance.get(`products`);
      setProducts(data);
      setProductsFilter(data);
      setError(false);
    } catch (error) {
      //!  دي معموله عشان حاله خاصه لان لو الرابط فيه مشكله الرد بيكون مختلف شويه
      if (!error.response?.data?.message) {
        toast.error("something Errors 😱");
      } else {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message);
      }
      setError(true);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function searchFn(term = "") {
    console.log(term);
    setFilterName("all");

    const tempProducts = structuredClone(products);
    if (term.length == 0) {
      setProductsFilter(tempProducts);
    } else {
      const filteredProducts = tempProducts.filter((product) => {
        return product.title.toLowerCase().includes(term.toLowerCase());
      });
      setProductsFilter(filteredProducts);
    }
  }

  function filterFn(filterTerm) {
    setFilterName(filterTerm);
    const tempProducts = structuredClone(products);
    if (filterTerm == "all") {
      setProductsFilter(products);
    } else if (filterTerm == "price-") {
      const filteredProducts = tempProducts.sort((a, b) => a.price - b.price);
      setProductsFilter(filteredProducts);
    } else if (filterTerm == "price+") {
      const filteredProducts = tempProducts.sort((a, b) => b.price - a.price);
      setProductsFilter(filteredProducts);
    } else if (filterTerm == "letter") {
      const filteredProducts = tempProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setProductsFilter(filteredProducts);
    }
  }

  // handle error
  if (error) {
    return <Error onRetry={getProducts} />;
  }
  // handle loading
  if (load) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <Loader className="animate-spin text-green-500 size-[50px] " />
      </div>
    );
  }

  return (
    <div className=" mt-5 min-h-screen container m-auto p-3">
      <h2 className="text-3xl tracking-wide font-semibold  mb-5">
        <span className="text-green-400">P</span>roducts
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className=" w-full md:w-[60%]  ">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onInput={(e) => {
                setHighlight(e.target.value);
                searchFn(e.target.value);
              }}
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </div>

        <div className="dropdown dropdown-left">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-green-500 text-white m-1"
          >
            Filtering
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu space-y-2 bg-base-100 rounded-box z-1  w-52 p-2 shadow-sm"
          >
            <li
              className={
                filterName == "all" ? "bg-black text-white rounded-md" : ""
              }
              onClick={() => {
                filterFn("all");
              }}
            >
              <a>All</a>
            </li>
            <li
              className={
                filterName == "price+" ? "bg-black text-white rounded-md" : ""
              }
              onClick={() => {
                filterFn("price+");
              }}
            >
              <a>Price High to Low</a>
            </li>
            <li
              className={
                filterName == "price-" ? "bg-black text-white rounded-md" : ""
              }
              onClick={() => {
                filterFn("price-");
              }}
            >
              <a>Price Low to High </a>
            </li>
            <li
              className={
                filterName == "letter" ? "bg-black text-white rounded-md" : ""
              }
              onClick={() => {
                filterFn("letter");
              }}
            >
              <a>Name (A–Z)</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {productsFilter.length == 0 ? (
          <p className="alert w-full mt-5 shadow flex justify-center text-center text-3xl">
            No products found
          </p>
        ) : (
          productsFilter.map((pr) => {
            return <Product key={pr.id} Highlight={Highlight} product={pr} />;
          })
        )}
      </div>
    </div>
  );
}

export default Home;
