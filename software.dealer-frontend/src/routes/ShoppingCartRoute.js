import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckIcon,
  ClockIcon,
  XMarkIcon as XMarkIconMini,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import QtySelectOptions from "../components/QtySelectOptions";

import Navbar from "../components/Navbar";

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function removeFromCart(link) {
    let newProducts = [];
    for (let i = 0; products.length > i; i++) {
      if (products[i].link !== link) {
        newProducts.push(products[i]);
      }
    }
    setProducts(newProducts);
    localStorage.setItem("shopping-cart", JSON.stringify(newProducts));
    let tempPrice = 0;

    for (let i = 0; newProducts.length > i; i++) {
      tempPrice += newProducts[i].price;
    }
    setPrice(tempPrice);
    toast.success("Erfolgreich den Artikel vom Warenkorb entfernt!");
  }

  useEffect(() => {
    document.title = "software.dealer - Shopping Cart";
    if (localStorage.getItem("shopping-cart") !== null) {
      setProducts(JSON.parse(localStorage.getItem("shopping-cart")));
      let tempPrice = price;

      for (
        let i = 0;
        JSON.parse(localStorage.getItem("shopping-cart")).length > i;
        i++
      ) {
        tempPrice +=
          JSON.parse(localStorage.getItem("shopping-cart"))[i].price *
          JSON.parse(localStorage.getItem("shopping-cart"))[i].quantity;
      }
      setPrice(tempPrice);
    } else {
      localStorage.setItem("shopping-cart", JSON.stringify([]));
      setProducts([]);
    }
  }, []);

  function handleQty(e, idx) {
    let prods = products;
    prods[idx].quantity = parseInt(e.target.value);
    localStorage.setItem("shopping-cart", JSON.stringify(prods));

    let tempPrice = 0;

    for (
      let i = 0;
      JSON.parse(localStorage.getItem("shopping-cart")).length > i;
      i++
    ) {
      tempPrice +=
        JSON.parse(localStorage.getItem("shopping-cart"))[i].price *
        JSON.parse(localStorage.getItem("shopping-cart"))[i].quantity;
    }
    setPrice(tempPrice);

    setProducts(prods);
  }

  return (
    <div className="bg-white">
      <Navbar />
      <main className="mx-auto mt-10 max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Warenkorb
        </h1>

        <form className="mt-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {products.map((product, productIdx) => (
                <li
                  key={`${product.link}${makeid(5)}`}
                  className="flex py-6 sm:py-10"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.link}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}€
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>
                        <select
                          onChange={(e) => {
                            handleQty(e, productIdx);
                          }}
                          value={product.quantity}
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          <QtySelectOptions quantity={product.stock} />
                        </select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <button
                            onClick={() => {
                              removeFromCart(product.link);
                            }}
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.stock > 1 ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product.stock > 1 ? "In stock" : `Not in stock`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Bestellungssumme
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Zwischensumme</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {price.toFixed(2)}€
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Versand</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">5€</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Bestellungssumme
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {(price + 5).toFixed(2)}€
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Bestellen
              </button>
            </div>
          </section>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
}
