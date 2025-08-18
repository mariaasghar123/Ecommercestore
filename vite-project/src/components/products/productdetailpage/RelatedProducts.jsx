import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const RelatedProducts = ({ currentId, allProducts }) => {
  const related = allProducts.filter((p) => p.id !== currentId).slice(0, 6); // 6 products

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        {related.map((product) => (
          <Link
            to={`/all-products/${product.id}`}
            key={product.id}
            className="p-4 border rounded shadow hover:shadow-md block relative flex flex-col h-full"
          >
            <div>
              <img
                src={product.productImageUrl}
                alt={product.title}
                className="mb-2 rounded w-full h-40 object-cover"
              />
              <h3 className="text-md font-medium">{product.title}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discount}
                </div>
              )}
            </div>

            <div className="mt-auto">
              <button className="w-full text-purple-700 border border-purple-700 rounded-full py-2 hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                <AiOutlinePlus />
                <span>Add to cart</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
