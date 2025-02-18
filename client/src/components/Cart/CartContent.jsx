import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      productId: 2,
      name: "Shirt",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
  ];
  return (
    <div className=" h-full divide-y flex flex-col gap-2 text-start">
      {cartProducts.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 border-b-2 border-b-primary/10 p-2 items-center justify-between"
        >
          <img src={item.image} className="w-25 h-25 rounded-lg object-cover" />
          <div className="flex flex-col flex-1">
            <h3 className=" text-xl font-medium">{item.name}</h3>
            <p className="text-tsecondary text-sm">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 items-center text-black">
            <div className="cart-add-minus">
              <AiOutlineMinus className="w-4 h-4" />
            </div>
            <p>{item.quantity}</p>
            <div className="cart-add-minus">
              <AiOutlinePlus className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
