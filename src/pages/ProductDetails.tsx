import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, Truck, Shield, Wrench } from "lucide-react";
import SectionTitle from "../components/shared/SectionTitle";
import ProductCard from "../components/shared/ProductCard";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";

// Mock data - replace with real data
const product = {
  id: 1,
  name: "Кухонный гарнитур Modern",
  price: 80000,
  description:
    "Современный кухонный гарнитур в стиле лофт. Функциональное решение для вашей кухни с использованием качественных материалов и фурнитуры.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  specifications: {
    Материал: "ЛДСП, МДФ",
    Цвет: "Графит",
    Размеры: "3000 x 2200 x 600 мм",
    Фурнитура: "Blum (Австрия)",
    Гарантия: "2 года",
  },
  category: "Кухни",
};

const relatedProducts = [
  {
    id: 2,
    name: "Кухонный гарнитур Classic",
    price: 75000,
    image: "/placeholder.svg",
    category: "Кухни",
  },
  {
    id: 3,
    name: "Кухонный гарнитур Premium",
    price: 95000,
    image: "/placeholder.svg",
    category: "Кухни",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  const handleConsultation = () => {
    toast.success(
      "Запрос на консультацию отправлен! Мы свяжемся с вами в ближайшее время."
    );
  };

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-accent">
            Главная
          </a>
          <ChevronRight size={16} />
          <a href="/catalog" className="hover:text-accent">
            Каталог
          </a>
          <ChevronRight size={16} />
          <span className="text-primary">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-accent"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-heading font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-accent mb-6">
              {product.price.toLocaleString("ru-RU")} ₽
            </p>
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-heading font-semibold mb-4">
                Характеристики
              </h2>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Truck className="text-accent" />
                <span className="text-sm">Доставка по России</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="text-accent" />
                <span className="text-sm">Гарантия 2 года</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="text-accent" />
                <span className="text-sm">Установка</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button onClick={handleAddToCart} className="btn-primary w-full">
                Заказать
              </button>
              <button
                onClick={handleConsultation}
                className="btn-secondary w-full"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <SectionTitle
            title="Похожие товары"
            subtitle="Вам также может понравиться"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
