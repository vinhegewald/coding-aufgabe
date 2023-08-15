import { StarIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product(props) {
  const addToShoppingCart = () => {
    if (localStorage.getItem("shopping-cart") === null) {
      props.product.quantity = 1;
      localStorage.setItem("shopping-cart", JSON.stringify([props.product]));
      toast.success("Erfolgreich zum Warenkorb hinzugefügt");
    } else {
      let temp = JSON.parse(localStorage.getItem("shopping-cart"));
      let exists = false;

      for (let i = 0; temp.length > i; i++) {
        console.log(temp[i].link, props.product.link);
        if (temp[i].link === props.product.link) {
          exists = true;
        }
      }

      if (!exists) {
        props.product.quantity = 1;
        temp.push(props.product);
        localStorage.setItem("shopping-cart", JSON.stringify(temp));
        toast.success("Erfolgreich zum Warenkorb hinzugefügt");
      } else {
        toast.error("Artikel befindet sich bereits im Warenkorb");
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg ">
              <img
                src={props.product.image}
                className="object-cover  object-center"
              />
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {props.product.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        props.product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <h3 className="font-normal pt-2">
                  Verfügbarkeit: {props.product.stock}
                </h3>
                <p className="sr-only">{props.product.rating} out of 5 stars</p>
              </div>
            </div>
            <p className="mt-6 text-gray-500">{props.product.description}</p>
            <div className="mt-10 gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={addToShoppingCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add to shopping cart ({props.product.price}€)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
