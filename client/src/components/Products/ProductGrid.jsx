import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="">
            <img
              src={product.images[0].url}
              alt={product.images.altText}
              className="object-cover h-50 lg:h-96 rounded-lg"
            />

            <h3 className="text-lg mt-2 font-medium">{product.name}</h3>
            <h3 className="text-sm text-gray-500">${product.price}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
