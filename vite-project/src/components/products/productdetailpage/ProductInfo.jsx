import { useCart } from "../../../context/Context";
 const ProductInfo = ({ product }) => {
    const { addToCart } = useCart();
     const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
      <p className="text-xl text-green-700 font-semibold">${product.price}</p>
      <p className="text-gray-500 line-through">${product.oldPrice}</p>
      <p className="text-sm text-red-500">{product.discount} OFF</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};
export default ProductInfo;