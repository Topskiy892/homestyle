import { useState } from "react";
import SectionTitle from "../components/shared/SectionTitle";
import ProductCard from "../components/shared/ProductCard";
import { Search } from "lucide-react";

const categories = [
  "Все",
  "Кухни",
  "Шкафы",
  "Стеллажи",
  "Столы",
  "Стулья",
  "Кровати",
];

const products = [
  {
    id: 1,
    name: "Кухонный гарнитур Modern",
    price: 85000,
    image: "/placeholder.svg",
    category: "Кухни",
  },
  {
    id: 2,
    name: "Шкаф-купе Premium",
    price: 45000,
    image: "/placeholder.svg",
    category: "Шкафы",
  },
  {
    id: 3,
    name: "Стеллаж Loft",
    price: 28000,
    image: "/placeholder.svg",
    category: "Стеллажи",
  },
  // Add more products...
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Все" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        <SectionTitle
          title="Каталог мебели"
          subtitle="Широкий выбор мебели для вашего дома"
        />

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Поиск по каталогу"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-accent text-white"
                      : "bg-secondary text-primary hover:bg-accent/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animation

Delay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              По вашему запросу ничего не найдено
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;