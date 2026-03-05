import { Link } from "react-router-dom";
import { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const startPrice = product.lengths?.[0]?.price ?? product.price;

  return (
    <div className="group">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </Link>
      <div className="space-y-1">
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-xl hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <p className="font-body text-sm font-semibold">From R{startPrice.toLocaleString()}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-3 block w-full py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors text-center"
        >
          View Options
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
