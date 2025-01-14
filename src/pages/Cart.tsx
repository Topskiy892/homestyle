import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import SectionTitle from "../components/shared/SectionTitle";

const Cart = () => {
  const { items, removeItem, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-medium">Корзина пуста</h2>
          <p className="mt-2 text-muted-foreground">
            Перейдите в каталог, чтобы добавить товары
          </p>
          <Link to="/catalog" className="btn-primary mt-4 inline-block">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <SectionTitle title="Корзина" subtitle="Ваши выбранные товары" />
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-md object-cover"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="mt-1 font-medium text-accent">
                {item.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-destructive hover:text-destructive/80"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Итого:</span>
            <span>{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
          </div>
          <button className="btn-primary mt-4 w-full">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;