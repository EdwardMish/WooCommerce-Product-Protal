import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { productService } from "../../services/productService";
import Spinner from "../../utils/spinner";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [variations, setVariations] = useState([]);
  const { _id } = queryString.parse(window.location.search);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    productService
      .getProductById(_id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productService
      .getVariations(_id)
      .then((res) => {
        setVariations(res.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <div className="flex w-screen h-auto justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex items-center justify-center md-auto max-w-7xl mt-12">
      <div className="w-96">
        <img
          src={product.images ? product.images[0].src : ""}
          alt={product.images ? product.images[0].alt : "no image"}
        />
      </div>
      <form className="p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold">{product.name}</h1>
          <div className="text-xl font-semibold text-gray-500">
            ${product.price}
          </div>
          <div className="w-full flex-none text-x1 font-medium text-gray-500 mt-2">
            {product.sku}
          </div>
          <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
            {product.stock_status}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div
            className="w-full flex-none text-x1 font-medium text-gray-500 mt-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
        <div className="flex items-baseline mt-4 mb-6">
          {variations ? (
            <div className="space-x-2 flex">
              <label>
                <input
                  className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg"
                  name="size"
                  type="radio"
                  defaultValue="xs"
                  defaultChecked
                />
                XS
              </label>
              <label>
                <input
                  className="w-9 h-9 flex items-center justify-center"
                  name="size"
                  type="radio"
                  defaultValue="s"
                />
                S
              </label>
              <label>
                <input
                  className="w-9 h-9 flex items-center justify-center"
                  name="size"
                  type="radio"
                  defaultValue="m"
                />
                M
              </label>
              <label>
                <input
                  className="w-9 h-9 flex items-center justify-center"
                  name="size"
                  type="radio"
                  defaultValue="l"
                />
                L
              </label>
              <label>
                <input
                  className="w-9 h-9 flex items-center justify-center"
                  name="size"
                  type="radio"
                  defaultValue="xl"
                />
                XL
              </label>
            </div>
          ) : (
            ""
          )}
          <div className="ml-auto text-sm text-gray-500 underline">
            Size Guide
          </div>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button
              className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
              type="submit"
            >
              Update Product
            </button>
            <button
              className="w-1/2 flex items-center justify-center rounded-md border border-gray-300"
              type="button"
            >
              Edit Product
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300"
            type="button"
            aria-label="like"
          >
            <svg width={20} height={20} fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Free shipping on all continental US orders.
        </p>
      </form>
    </div>
  );
}
