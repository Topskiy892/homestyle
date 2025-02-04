import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="font-heading font-bold text-xl">
            HomeStyle
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Главная
            </Link>
            <Link to="/catalog" className="nav-link">
              Каталог
            </Link>
            <Link to="/custom-furniture" className="nav-link">
              Мебель на заказ
            </Link>
            <Link to="/about" className="nav-link">
              О нас
            </Link>
            <Link to="/contacts" className="nav-link">
              Контакты
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                Главная
              </Link>
              <Link
                to="/catalog"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Каталог
              </Link>
              <Link
                to="/custom-furniture"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Мебель на заказ
              </Link>
              <Link
                to="/about"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                О нас
              </Link>
              <Link
                to="/contacts"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Контакты
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;