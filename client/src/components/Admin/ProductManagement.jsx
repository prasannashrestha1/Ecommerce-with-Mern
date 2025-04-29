import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getAllProducts,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the product")) {
      dispatch(deleteProduct(id));
    }
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error}...</p>;
  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-200 uppercase text-xs font-medium">
            <tr className="text-gray-700">
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Price</th>
              <th className="px-4 py-2 ">SKU</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className={` ${
                    index % 2 !== 0 ? "bg-gray-100" : ""
                  } text-gray-900 cursor-pointer`}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 ">{product.price}</td>
                  <td className="px-4 py-2 ">{product.sku}</td>
                  <td className="px-4 py-2 ">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="px-2 py-1 text-white bg-yellow-500 rounded-xl"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-2 py-1 ml-2 text-white bg-red-500 rounded-xl"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 font-semibold text-lg text-center"
                >
                  {" "}
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
