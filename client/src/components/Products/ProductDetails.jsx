import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProduct,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct && selectedProduct.sizes ? selectedProduct.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState([
    selectedProduct && selectedProduct.colors ? selectedProduct.colors[0] : "",
  ]);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    selectedProduct && selectedProduct.images.length > 0
      ? selectedProduct.images[0].url
      : []
  );
  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProduct(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
      }
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
      }
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        setSelectedImage(selectedProduct.images[0].url);
      }
    }
  }, [selectedProduct]);

  const handleMinusQuantity = () => {
    setQuantity((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to the cart");
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully", {
          duration: 3000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>Error while loading the component {error}</p>;
  }

  if (selectedProduct) {
    return (
      <section className="p-6 mx-auto">
        <div className=" flex flex-col justify-center md:flex-row gap-8 bg-white  rounded-lg">
          {/* left content */}
          <div className="flex flex-col w-full md:w-fit md:flex-row gap-4 ">
            <div className="hidden md:flex flex-col gap-3">
              {selectedProduct &&
                selectedProduct.images &&
                selectedProduct.images.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      selectedImage === item.url
                        ? "outline-4 outline-primary rounded-md"
                        : ""
                    }`}
                  >
                    <img
                      onClick={() => setSelectedImage(item.url)}
                      className="w-20 h-20 rounded-md object-cover"
                      src={item.url}
                      alt={item.altText}
                    />
                  </div>
                ))}
            </div>
            <img
              className="h-[400px]  md:w-[400px] object-cover rounded-lg"
              src={selectedImage}
            ></img>
            <div className="flex md:hidden gap-2">
              {selectedProduct &&
                selectedProduct.images &&
                selectedProduct.images.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      selectedImage === item.url
                        ? "outline-2 outline-primary rounded-lg"
                        : ""
                    }`}
                  >
                    <img
                      onClick={() => setSelectedImage(item.url)}
                      className="w-20 h-20 rounded-lg object-cover"
                      src={item.url}
                      alt={item.altText}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Right Content */}
          <div className="flex flex-col grow max-w-[500px] gap-4">
            {/* Header  */}
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="text-2xl font-medium">{selectedProduct.name}</h3>
              <div className="flex gap-2 items-center">
                <p className=" text-gray-500">${selectedProduct.price}</p>
                <p className=" line-through text-xs text-gray-500">
                  ${selectedProduct.originalPrice}
                </p>
              </div>
              <p className="grow text-sm text-gray-500">
                {selectedProduct.description}
              </p>
            </div>
            {/* color */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Color:</p>
              <div className="flex gap-2">
                {selectedProduct &&
                  selectedProduct.colors &&
                  selectedProduct.colors.map((color, index) => (
                    <span
                      onClick={() => setSelectedColor(color)}
                      key={color}
                      style={{ backgroundColor: color.toLocaleLowerCase() }}
                      className={`w-5 h-5 rounded-full ${
                        selectedColor === color
                          ? "outline-2 outline-primary"
                          : "outline-none"
                      }`}
                    ></span>
                  ))}
              </div>
            </div>
            {/* sizes */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Size:</p>
              <div className="flex gap-2">
                {selectedProduct.sizes &&
                  selectedProduct.sizes.map((size, index) => (
                    <span
                      onClick={() => setSelectedSize(size)}
                      key={size}
                      className={`px-3 py-1 text-sm border border-gray-300 ${
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "outline-none"
                      }`}
                    >
                      {size}
                    </span>
                  ))}
              </div>
            </div>
            {/* quantity */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Quantity:</p>
              <div className="flex gap-3">
                <button
                  onClick={handleMinusQuantity}
                  className={` px-2 py-0.5 ${
                    quantity <= 1
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-gray-400"
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={handlePlusQuantity}
                  className="bg-gray-400 px-2 py-0.5"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`w-full rounded-lg px-3 py-2 max-w-xs bg-primary  text-white ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-primary/80"
              } cursor-pointer mt-5`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>
            {/* Characteristics */}
            <div className="div flex gap-8 mt-5 text-sm text-gray-500">
              <ul>
                <li>Material:</li>
                <li>Characteristics:</li>
              </ul>
              <ul>
                <li>{selectedProduct.material}</li>
                <li>{selectedProduct.brand}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container my-20 max-w-6xl mx-auto ">
          <h2 className="text-2xl  mx-auto text-center font-medium mb-8">
            You may also like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />
        </div>
      </section>
    );
  }
};

export default ProductDetails;
