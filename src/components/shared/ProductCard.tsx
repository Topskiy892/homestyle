import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="card overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-1">{category}</p>
          <h3 className="font-heading font-medium text-lg mb-2">{name}</h3>
          <p className="text-accent font-semibold">
            {price.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;