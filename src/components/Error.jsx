// eslint-disable-next-line react/prop-types
function Error({ onRetry }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-20 flex items-center  justify-center">
      <div className="text-center">
        <p className=" w-[90%] m-auto text-center  text-3xl text-white  p-6 rounded   mb-3 ">
          ⚠️ Failed to load products. Please try again later.
        </p>
        <button onClick={onRetry} className="btn">
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Error;
